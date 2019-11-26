import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/Header';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
//import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { red } from '@material-ui/core/colors';
import { classes } from 'istanbul-lib-coverage';
import moment from "moment";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//import hearticon from '../../assets/hearticon.svg';


const styles = theme => ({
    root: {
        width: '100%',
    },
    card: {
      maxWidth: 145
    },
    profileAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer',

    },
    avatar: {
        backgroundColor: red[500],
      }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userphotos: [],
            ownerInfo: [],
            heartIcon: {
                id: 1,
                stateId: "heart1",
                color:"black"
            },
            comment:"",
            addComment:"dispComment"
        }
    }

    heartClickHandler = (id) => {
        console.log("clicking the icon");
            if (this.state.heartIcon.id === id){
            //    console.log("inside if");
                this.setState({
                    heartIcon: {
                        color:"red"                    }
                    
                });
             //   this.setState.userphotos.likes.count += 1;
            } else {
             //   console.log("inside else if");
                this.setState({
                    heartIcon: {
                        color:"black"                    }
                    
                });
            }           
            
    }

    commentOnChangeHandler = (e) => {
        this.setState({comment: e.target.value});
    }

    addCommentOnClickHandler = (e) => {
        this.setState({addedComment :this.state.comment});

    }


    componentWillMount() {
      let data = null;
        let baseUrl="https://api.instagram.com/v1/users/self/media/recent?access_token=";
        let xhr = new XMLHttpRequest();
        let that = this;
        let access_token=this.props.access;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    userphotos: JSON.parse(this.responseText).data
                });
            }
        });

       // xhr.open("GET", baseUrl + access_token);
       xhr.open("GET", baseUrl + '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

render(){
   // const { classes } = this.props;
   const DATE_OPTIONS= {day:'numeric', month:'numeric', year:'numeric'}
   
    return(<div>
        <div><Header heading="Image Viewer" searchDisplay="dispSearch" iconDisplay="dispBlock" onClick/></div>
        <div className= "homeBody">
        <GridList cellHeight={"auto"}  cols={2}>
        {this.state.userphotos.map(photo=>(
            <GridListTile key={"grid" + photo.id} cols={photo.cols|| 1}>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item>
                    <Card className={classes.card}>
                    <CardHeader 
                             avatar={
                                 <Avatar className={classes.profileAvatar}>
                                    <img src={logo}/>
                                    </Avatar>
                              }
                                title={photo.caption.from.username}
                                subheader={ moment(photo.caption.created_time).fromNow() }
                    />
                    <CardContent>
                            <img src={photo.images.low_resolution.url} alt={photo.caption.text} className="imageProp" />
                            <hr/>
                            <Typography variant="h6">{(photo.caption.text).split(/\#/)[0]}</Typography>
                            {photo.tags.map(tag=><span className="hash-tags">#{tag} </span>)}
                            <br></br>
                            <br></br>
                            <div className="likesProp">
                                <Typography variant="h5" >
                                    <FavoriteBorderIcon className ={this.state.heartIcon.color} key={this.state.heartIcon.id} 
                                              onClick={() => this.heartClickHandler(this.state.heartIcon.id)} />
                                           {photo.likes.count} Likes</Typography> </div>
                                   
                                <FormControl >
                                    <FormHelperText className={this.state.addComment}><Typography> {this.state.addedComment}</Typography></FormHelperText>
                                </FormControl> <br></br>  <br></br>
                                <FormControl>
                                    <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                     <Input id="comment" type="text" onChange={this.commentOnChangeHandler} />
                                </FormControl>
                                    <Button id="addedcomment" variant="contained" color="primary" onClick={this.addCommentOnClickHandler}>ADD</Button>
                                

                    </CardContent>


                    </Card>

                    </Grid>
                </Grid>         
                
            )</GridListTile> ))}
            </GridList>

        </div>              
    </div>) 
}
}
export default Home;
