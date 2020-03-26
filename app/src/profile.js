import React, { Component } from "react";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        users: [],
        articles: [],
        comments: [],
        loaded: false,
        placeholder: 'Loading'
        };
    }

    componentDidMount() {
        fetch("api/User")
        .then(response => response.json())
        .then(users => {
            this.setState({ users, loaded: true});

            return fetch('api/Article');
        })
        .then(response => response.json())
        .then(articles => {
            this.setState({ articles, loaded: true });

            return fetch('api/Comment');
        })
        .then(response => response.json())
        .then(comments => {
            this.setState({ comments, loaded: true});
        })
        .catch((err) => {
            console.error(err);
            this.setState({ placeholder: err.message });
        });
    }

    render() {
        return (
            <div>
            <ul>
                {this.state.users.map((users) => {
                return (
                    <li key={users.user_id}>
                    {users.first_name} - {users.last_name} - {users.email}
                    </li>
                )
                })}
            </ul>

            {this.state.articles.map((articles) => {
                return (
                <p> {articles.text} </p>
                )
            })}


            {this.state.comments.map((comments) => {
                return (
                <p> {comments.user} - {comments.comment_text} </p>
                )
            })}

            </div>
        );
    }
}

export default Profile;
