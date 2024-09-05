import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/FeedComponent.css';

const FeedComponent = ({ currentUser }) => {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState('');
	const [filter, setFilter] = useState('newest');
	const [newComment, setNewComment] = useState({});
	const [likedPosts, setLikedPosts] = useState(new Set());
	const [whoToFollow, setWhoToFollow] = useState([]); // For "Who to Follow" section
	const navigate = useNavigate();

	const date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	useEffect(() => {
		// Fetching posts
		fetch(http://localhost:5001/getPosts?username=${currentUser.username})
			.then(response => response.json())
			.then(data => setPosts(data));

		// Fetching "Who to Follow" recommendations
		fetch('http://localhost:5001/getWhoToFollow')
			.then(response => response.json())
			.then(data => setWhoToFollow(data));
	}, [currentUser.username]);

	const handleCreatePost = () => {
		// Post creation functionality
		fetch('http://localhost:5001/createPost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: currentUser.username,
				userProfilePic: currentUser.profilePic,
				createdAt: ${ year } - ${ month } - ${ day },
				content: newPost
			}),
		})
			.then(response => response.json())
	.then(data => {
		setPosts([...posts, data]);
		setNewPost('');
	});
	};

const handleFilterChange = (e) => {
	setFilter(e.target.value);
};

const handleCommentChange = (e, postId) => {
	setNewComment({ ...newComment, [postId]: e.target.value });
};

const handleAddLike = (postId) => {
	// Like functionality
	if (likedPosts.has(postId)) {
		return;
	}

	fetch('http://localhost:5001/likePost', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ postId }),
	})
		.then(response => response.json())
		.then(likedPost => {
			const updatedPosts = posts.map(post => post.id === postId ? likedPost : post);
			setPosts(updatedPosts);
			setLikedPosts(new Set(likedPosts).add(postId));
		});
};

const handleAddComment = (postId) => {
	const commentText = newComment[postId];
	if (!commentText) return;

	fetch('http://localhost:5001/addComment', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			postId,
			username: currentUser.username,
			userProfilePic: currentUser.profilePic,
			createdAt: ${ year } - ${ month } - ${ day },
			comment: commentText,
			}),
		})
			.then(response => response.json())
	.then(newCommentData => {
		const updatedPosts = posts.map(post =>
			post.id === postId ? { ...post, comments: [...post.comments, newCommentData] } : post
		);
		setPosts(updatedPosts);
		setNewComment({ ...newComment, [postId]: '' });
	});
	};

const handleFollow = (userId) => {
	// Logic to follow a user
};

const sortedPosts = [...posts].sort((a, b) => {
	if (filter === 'likes') return b.likes - a.likes;
	if (filter === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
	return new Date(b.timestamp) - new Date(a.timestamp);
});

return (
	<div className="feedContainer">
		{/* Your Feed */}
		<h2>Your Feed</h2>
		<div className="createPostContainer">
			<img src={currentUser.profilePic} alt="Profile" className="userProfilePic" />
			<input
				type="text"
				value={newPost}
				onChange={e => setNewPost(e.target.value)}
				placeholder="Post to your friends & followers..."
			/>
			<button onClick={handleCreatePost}>Post</button>
		</div>

		{/* Who to Follow */}
		<div className="whoToFollowContainer">
			<h3>Who to follow</h3>
			{whoToFollow.map(user => (
				<div key={user.id} className="followSuggestion">
					<img src={user.profilePic} alt="User" className="followProfilePic" />
					<div className="followInfo">
						<p>{user.username}</p>
						<p>Followed by {user.mutualFriends} friend(s)</p>
					</div>
					<button onClick={() => handleFollow(user.id)}>Follow</button>
				</div>
			))}
		</div>

		{/* Posts */}
		<div className="filterContainer">
			<label htmlFor="filter">Sort by:</label>
			<select id="filter" value={filter} onChange={handleFilterChange}>
				<option value="newest">Newest</option>
				<option value="likes">Most Liked</option>
				<option value="oldest">Oldest</option>
			</select>
		</div>
		<div className="postsContainer">
			{sortedPosts.map(post => (
				<div key={post.id} className="post">
					<div className="postDiv">
						<div className="postHeader">
							<img src={post.userProfilePic} alt="User" className="postUserProfilePic" />
							<div className="postUserInfo">
								<p className="postUsername">{post.username}</p>
								<p className="postTimestamp">{post.createdAt}</p>
							</div>
						</div>
						<p className="postContent">{post.content}</p>
						<button className="likeButton" onClick={() => handleAddLike(post.id)}>
							Like ({post.likes})
						</button>
					</div>
					<div className="commentsSection">
						{post.comments && post.comments.map(comment => (
							<div key={comment.id} className="comment">
								<img src={comment.userProfilePic} alt="User" className="commentUserProfilePic" />
								<div>
									<p className="commentUsername">{comment.username}</p>
									<p className="commentContent">{comment.content}</p>
								</div>
							</div>
						))}
						<div className="addCommentSection">
							<input
								type="text"
								value={newComment[post.id] || ''}
								onChange={e => handleCommentChange(e, post.id)}
								placeholder="Add a comment..."
							/>
							<button onClick={() => handleAddComment(post.id)}>Comment</button>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);
};

export default FeedComponent;