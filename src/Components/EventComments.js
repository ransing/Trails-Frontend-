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
    fetch("http://trailsbackend1.herokuapp.com/event_comments", {
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

  addEventComment = eventComment => {
    this.setState(prevState => {
      return {
        commentArray: [...prevState.commentArray, eventComment],
        comment: ""
      };
    });
    // alert("new")
    // console.log(this.props.alert);
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
    fetch(`http://trailsbackend1.herokuapp.com/${e.target.dataset.id}`, {
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
        <li style={{"color": "black"}}>
          <span style={{"font-weight": "bold"}}>{e.details}</span>-<span style={{"font-style": "oblique"}}>{e.user_name}{" "}</span>
          <button data-id={e.id} onClick={this.deleteComment}>
            X
          </button>{" "}
        </li>
      </React.Fragment>
    ));

    return (
      <div style={{"padding":"3px"}}>
        <React.Fragment>
          {/* <Provider template={AlertTemplate} {...options}> */}
          <div>
            <span style={{"font-weight": "bold", "font-size":"16px"}}>Event Comments:</span>
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
                "font-family": "Nunito",
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
