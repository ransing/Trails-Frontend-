import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert, withAlert } from "react-alert";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER
};

class EventComments extends Component {
  state = {
    comment: "",
    commentArray: this.props.event.event_comments
  };

  //   const alert = useAlert();

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    // this.setState({
    //     commentArray: this.state.commentArray
    // })
  }

  componentDidUpdate(prevProps) {
    // console.log("update");
    // console.log(this.state.commentArray)
    // if(prevProps.event.event_comments)
  }

  mount = () => {
    this.componentDidUpdate();
  };

  handleSubmit = e => {
    e.preventDefault();
    // let comment = this.state.comment
    // console.log(this.state.answer)
    // this.setState({
    //     comment: ""
    // })
    const sendToken = localStorage.token;
    // debugger
    fetch("http://localhost:3000/event_comments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: sendToken
      },
      body: JSON.stringify({
        event_comment: {
          details: this.state.comment,
          user_id: this.props.userId,
          event_id: this.props.event.id
        }
      })
    });
    //   .then(r => r.json())
    //   .then(newComment => {
    //     // console.log(newComment.user.username)
    //     this.setState({
    //       commentArray: [...this.state.commentArray, newComment],
    //       comment: ""
    //     });
    //   });
  };

  // const handleNewPost = post => {
  //   if (user.id && post.user.id !== user.id) {
  //     addPostWaiting(post)
  //   } else if (user.id && post.user.id === user.id) {
  //     addCreatedPost(post)
  //   }
  // } eventcomment.id , detials, user_id, event_id 

  addEventComment = eventComment => {

    if (this.props.event.id == eventComment.event_id)
    this.setState(prevState => {
      return {
        commentArray: [...prevState.commentArray, eventComment],
        comment: ""
      };
    });
    // alert("new")
    console.log(this.props.alert);
    const alert = this.props.alert;
    alert.show("new comment received");

    // {
    //       commentArray: [...this.state.commentArray, eventComment],
    //       comment: ""
    //     })
    //     this.forceUpdate()
  };

  deleteComment = e => {
    // console.log(e.target.dataset.id);
    const dataSet = e.target.dataset.id;
    fetch(`http://localhost:3000/event_comments/${e.target.dataset.id}`, {
      method: "DELETE"
    }).then(r => {
      //   this.forceUpdate();
      //   debugger;
      this.setState({
        commentArray: this.state.commentArray.filter(comment => {
          //   debugger;
          return comment.id !== parseInt(dataSet);
        })

        // commentArray: this.state.commentArray
      });
      //   debugger;
    });
  };

  render() {
    const eventComment = this.state.commentArray.map(e => (
      <React.Fragment>
        <li>
          {e.details}-{e.user_name}{" "}
          <button data-id={e.id} onClick={this.deleteComment}>
            X
          </button>{" "}
        </li>
      </React.Fragment>
    ));

    return (
      <div>
        <React.Fragment>
          {/* <Provider template={AlertTemplate} {...options}> */}
          <div>
            Event Comments:
            {eventComment}
          </div>

          <ActionCableConsumer
            channel={{ channel: "EventCommentsChannel" }}
            onReceived={eventComment => {
              this.addEventComment(eventComment);
            }}
          />

          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Input
              fluid
              placeholder="Insert Comment Here"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
              required
            />
            <Button
              id="submit-button"
              style={{
                "font-family": "Special Elite",
                "border-radius": "50px"
              }}
              type="submit"
            >
              Submit Comment
            </Button>
          </Form>
          {/* </Provider> */}
        </React.Fragment>
      </div>
    );
  }
}

export default withAlert()(EventComments);
