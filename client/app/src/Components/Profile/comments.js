import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { createComment, getReviews } from '../../Actions/reviewActions';
import styled from 'styled-components'
import {getProfile} from '../../Actions/profileActions'
const Form = styled.form`
  & textarea{
    width:100%;
    border:1px solid #ccc;
  }
`
class CommentBox extends Component {

  getInitialState() {
    return {
      data: this.props.data
    }
  }

  handleCommentSubmit = (comment) => {
    this.props.data.push(comment);
    var comments = this.props.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  }

  render() {
    return (
      <div className="comment-box">
        <CommentForm data={this.props.data} onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.props.data} />
      </div>
    );
  }
}

class CommentList extends Component {
  render() {
    return (
      <div className="comment-list">
        {this.props.data.map(function(c, i){
          return <div key={i}>
                  <Comment ownerUsername={c.ownerUsername} message={c.message} profileImg={c.profileImg}/>
                </div>;
        })}
      </div>
    );
  }
}

class CommentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      targetId:localStorage.getItem('userId'),
      dataTarget: {}
    }
  }

  componentDidMount() {
    var userId = localStorage.getItem('userId');
    var author = getProfile(userId);
    author.then(result => {
      console.log(result.profile)
      this.setState({
        data: result.profile,
      })
    })

    if (this.props.targetId != null) {
      this.setState({
        targetId:this.props.targetId
      })
    }
    var target = getProfile(this.state.targetId);
    target.then(result => {
      this.setState({
        dataTarget: result.profile,
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Get current user logged in
    
    // TODO: Get author
    // var userId = localStorage.getItem('userId');
    // var author = getProfile(userId);
    // author.then(result => {
    //   this.setState({
    //     data: result.profile,
    //   })
    // })
    
    var authorVal = this.state.data.firstname + this.state.data.lastname
    var authorIdVal = this.state.data._id
    var authorTypeVal = this.state.data.userType
    var authorImgVal = "https://cdn.guidingtech.com/media/assets/WordPress-Import/2012/10/Smiley-Thumbnail.png"

    // TODO: Get target
    var targetIdVal = this.state.dataTarget._id
    var targetVal = this.state.dataTarget.firstname + this.state.dataTarget.lastname
    var targetTypeVal = this.state.dataTarget.userType

    var textVal = e.target[0].value.trim();


    if (!textVal || !authorVal || !authorImgVal) {
      return;
    }

    var token = localStorage.getItem('token');

    // TODO: Get information
    var data = {
      message: textVal,
      ownerId: authorIdVal,
      targetId: targetIdVal,
      ownerUsername: authorVal,
      targetUsername: targetVal,
      ownerType: authorTypeVal,
      targetType: targetTypeVal,
      profileImg: authorImgVal
    }

    console.log(data)
    // Send data to API
    createComment(data, token);
    
    this.props.onCommentSubmit({ownerUsername: authorVal, message: textVal, profileImg: authorImgVal});
    e.target[0].value = '';
    e.target[1].value = '';
    return;
  }
  
  render() {
    return(
      <Form className="comment-form form-group" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <textarea className="form-control" ></textarea>
        </div>
        <input type="submit" value="แสดงความคิดเห็น" className="btn btn-primary" />
      </Form>
    );
  }
}

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div><Avatar size="60" src={this.props.profileImg} round={true}/> <b>{this.props.ownerUsername}</b></div>
        {this.props.message}
      </div>
    );
  }
}

class Comments extends Component {

    constructor(props) {
      super(props)
      this.state = {
        commentData: []
      }
    }

    componentDidMount() {
      var targetId = this.props.targetId;
      var reviews = getReviews(targetId)
      reviews.then(result => {
        console.log(result)
        this.setState({
          commentData: result,
        })
      })
    }

    render() {
      const { commentData } = this.state
      return (
        <div className="Comments">
          <header className="Comments-header">
              <CommentBox data={commentData} />
          </header>
        </div>
      );
    }
  }

export default Comments;