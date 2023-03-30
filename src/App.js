
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db, auth, storage} from './config/Firebase';
import {getDocs,collection,addDoc, deleteDoc,doc,updateDoc} from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';
import { async } from '@firebase/util';

function App() {
  const [movieList,setMovieList] = useState([]);
  

  //newmovie states
  const [newMovie,setNewMovie] = useState([]);
  const [newReleaseDate,setNewReleaseDate] = useState(0);
  const [isOscar,setIsOscar] = useState(false);
  //update title
  const [updatedTitle,setUpdatedTitle] = useState([]);

  //upload file
  const [uploadFile,setUploadFile] = useState(null);
  //firebase reference
  const movieCollectionRef = collection(db,"movies");
//asynchronous inside a useeffect

const getMovieList = async () =>{
      
      //read data
      //set the movielist
      try{
      const data = await getDocs(movieCollectionRef );
      const filteredData = data.docs.map((doc)=>({...doc.data(),id: doc.id,}));
      console.log(filteredData);
      setMovieList(filteredData);
     }catch(err){
      console.error(err);
     }
};
  useEffect(()=>{
   
    getMovieList();
  },[]);

      const onSubmitMovie  =  async() =>{
        try{
            await addDoc(movieCollectionRef,
              {title: newMovie,
               releasedate:newReleaseDate,
               oscar: isOscar,
               userId: auth?.currentUser?.uid,
               })
          getMovieList();
            }catch(err){
          console.error(err);
        }
      };

      const deleteMovie  =  async(id) =>{
        const movieDoc = doc(db, "movies", id)
        
            await deleteDoc(movieDoc);
        getMovieList();
      };
      
       const fileUpload = async() =>{
           if (!uploadFile) return;
          const fileFolderRef = ref(storage,`projectFiles/${uploadFile.name}`);
          try{
          await uploadBytes(fileFolderRef, uploadFile);
          }catch(err){
            console.error(err);
          }
       }


      const updateMovie  =  async(id) =>{
        const movieDoc = doc(db,"movies",id);
             await updateDoc(movieDoc,{title:updatedTitle});
        getMovieList();
      };
  return (
    <div className="App">
       
    <Auth />
    <div>
      <input  placeholder='movie title'  onChange={(e) => {setNewMovie(e.target.value);}}/>
      <input  placeholder='release date' type="number" onChange={(e) => {setNewReleaseDate(Number(e.target.value));}}/>
      <input type="checkbox" checked={isOscar}  onChange={(e) => {setIsOscar(e.target.checked);}}/> <label>received oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>
    <div>
      {movieList.map((movie)=>(
        <div>
          <h1 style={{color: movie.oscar?"green" : "red"}}>{movie.title}</h1>
          <p>date:{movie.releasedate}</p>
           <button onClick={() => deleteMovie(movie.id)}>delete movie</button>
          <input placeholder='new title...' onChange={(e)=>{setUpdatedTitle(e.target.value);}}/>
          <button onClick={() => updateMovie(movie.id)}>update title</button>
        </div>
      ))}
    </div>
     
     <div>
      <input  type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
      <button  onClick={fileUpload}>upload file</button>
    </div>
    </div>
  );
}
;
export default App;