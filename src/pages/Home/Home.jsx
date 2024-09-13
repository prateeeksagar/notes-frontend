import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import moment from "moment"
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../../public/add-notes-bg.webp'
import notFoundImg from '../../../public/9276414.jpg'
const Home = () => {

  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  })

  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false)

  const navigate = useNavigate()

  const handleEdit = async (noteDetails) => {
    setOpenEditModal({ isShown: true, data:noteDetails, type: "edit" })
  }

  const showToastMessage = (message, type) => {
    console.log(message, type)
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    })
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      if(response.data && response.data?.user) {
        setUserInfo(response.data.user)
        
      }
      
    } catch (error) {
      if(error.response.status == 401) {
        localStorage.clear();
        navigate("/login")
      }
    }
  }

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/all-notes")
      if(response.data && response.data?.notes) {
        setAllNotes(response.data.notes) 
      }
      
    } catch (error) {

      console.log("unexpected error occured. Please try again later")
    }
  }

  const onSearchNote = async (query) => {
    const response = await axiosInstance.get("/search-notes",{
      params : { query }
    })

    if(response.data && response.data.notes) {
      setIsSearch(true);
      setAllNotes(response.data.notes)
    }
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id
    try {
      const response  = await axiosInstance.post(`/update-note-pinned/${noteId}`, {
        isPinned : !noteData.isPinned
      })
  
      if(response.data && response.data.note) {
        showToastMessage( noteData.isPinned ? "Unpinned Successfully" : "Pinned Successfully" )
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }

  }

  const deleteNote = async (data) => {
    const noteId = data._id;
    console.log("delete note")
    try {
      const response  = await axiosInstance.post(`/delete-note/${noteId}`)
      console.log(response);
      if(response.data && response.data.error == false) {
        showToastMessage("Note Deleted Successfully", "delete")
        getAllNotes()
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        console.log("unexpected error occured. Please try again later")
      } 
    }
  }

  useEffect(() => {
    getUserInfo()
    getAllNotes()
  },[])

  return (
    <>
      <Navbar userInfo = {userInfo} onSearchNote={onSearchNote} getAllNotes = {getAllNotes}/>
      <div className='mx-auto container p-2'>
        {allNotes.length > 0 ? (<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {allNotes.map((note,index) => (
          <NoteCard 
          key = {note._id}
          title = {note.title}
          date={note.createdOn}
          content={note.content}
          tags= {note.tags}
          isPinned={note.isPinned}
          onEdit={() => handleEdit(note)}
          onDelete={() => deleteNote(note)}
          onPinNote={() => updateIsPinned(note)}
          />
        ))}
        </div>
      ) : (
        <EmptyCard imgSrc = {isSearch ? notFoundImg : AddNotesImg} message={isSearch ? "Oops! no data found!":"Start creating you note!. Click on the 'Add' button to start!"} />
      ) }
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenEditModal({isShown: true, type: "add", data: null})
      }}>
      <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal 
      isOpen = {openEditModal.isShown}
      onRequestClose = {() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",

        }
      }}
      contentLabel = ""
      className = "w-[80%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
      >
      <AddEditNotes
      type = {openEditModal.type}
      noteData = {openEditModal.data}
      onClose={() => {
        setOpenEditModal({isShown: false, type: "add", data: null})

      }}
      getAllNotes = {getAllNotes}
      showToastMessage = {showToastMessage}
      />
      </Modal>

      <Toast
      isShown = {showToastMsg.isShown}
      type = {showToastMsg.type}
      message = {showToastMsg.message}
      onClose = {handleCloseToast}
      />
    </>
  )
}

export default Home
