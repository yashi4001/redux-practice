import { useState,useEffect } from "react";
import store from "./store"
import userStore from "./userStore"
import { bugAdd,bugRemove,bugResolve } from "./actions";
import firebase from "firebase"
import {login,logout} from "./userActions"
import { StyledFirebaseAuth } from 'react-firebaseui'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

var configUI={
  signInFlow:"popup",
  signInOptions:[
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks:{
    signInSuccessWithAuthResult:()=>{
      return false;
    }
  }

}

function App() {
  const classes = useStyles();
  const[bugs,setBugs]=useState(store.getState())
  const[desc,setDesc]=useState("")
  const[user,setUser]=useState(userStore.getState())

  useEffect(()=>{
    const authObserver=firebase.auth().onAuthStateChanged((user)=>{
      setUser(user);
      {user?userStore.dispatch(login(user.displayName,user.email)):userStore.dispatch(logout())}
      
    });
  })

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Successufully Signed out");
        setUser(null)
      })
      .catch(function () {
        console.log("Error Signed out");
      });
  };
  
  return (
    <div className="App">
    {!user?
      <StyledFirebaseAuth uiConfig={configUI} firebaseAuth={firebase.auth()} />:<>
      <h1>Bug Tracker</h1>
      <div>
        <input type="text" placeholder="bug description" onChange={(event)=>setDesc(event.target.value)}></input><span><button onClick={()=>{store.dispatch(bugAdd(desc));setBugs(store.getState())}}>Add Bug</button></span>
      </div>
      <div>
        {bugs.map(bug=><div className={classes.root} ><span style={bug.resolved?{textDecoration:"line-through"}:null}>{bug.description}</span> <span><Chip
        label="Resolve"
        color="primary"
        onClick={()=>{store.dispatch(bugResolve(bug.ID));setBugs(store.getState())}}
        deleteIcon={<DoneIcon />}
      /></span><span><Chip
        onClick={()=>{store.dispatch(bugRemove(bug.ID));setBugs(store.getState())}}
        label="Remove"
        color="secondary"
      /></span></div>)}
      </div>
      <button onClick={signOut} >Sign out</button>
      </>}
    </div>
  );
}

export default App;
