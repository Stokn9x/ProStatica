import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/FeedComponent.css';

const FeedComponent = ({ currentUser }) => {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState('');
	const [filter, setFilter] = useState('newest');
	const [newComment, setNewComment] = useState({});
	const [likedPosts, setLikedPosts] = useState(new Set());
	const navigate = useNavigate();

	const date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	useEffect(() => {
		fetch(`http://localhost:5001/getPosts?username=${currentUser.username}`)
			.then(response => response.json())
			.then(data => setPosts(data));
	}, [currentUser.username]);

	const handleCreatePost = () => {
		fetch('http://localhost:5001/createPost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: currentUser.username,
				userProfilePic: currentUser.profilePic,
				createdAt: `${year}-${month}-${day}`,
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
		if (likedPosts.has(postId)) {
			return; // User has already liked this post
		}

		fetch('http://localhost:5001/likePost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId,
			}),
		})
			.then(response => response.json())
			.then(likedPost => {
				const updatedPosts = posts.map(post => {
					if (post.id === postId) {
						return likedPost;
					}
					return post;
				});
				setPosts(updatedPosts);
				setLikedPosts(new Set(likedPosts).add(postId)); // Add postId to likedPosts
			});
	};

	const handleAddComment = (postId) => {
		const commentText = newComment[postId];
		if (!commentText) return;

		fetch('http://localhost:5001/addComment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId,
				username: currentUser.username,
				userProfilePic: currentUser.profilePic,
				createdAt: `${year}-${month}-${day}`,
				comment: commentText
			}),
		})
			.then(response => response.json())
			.then(newCommentData => {
				const updatedPosts = posts.map(post => {
					if (post.id === postId) {
						return { ...post, comments: [...post.comments, newCommentData] };
					}
					return post;
				});
				setPosts(updatedPosts);
				setNewComment({ ...newComment, [postId]: '' });
			});
	};

	const handleDeletePost = (postId) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			fetch('http://localhost:5001/deletePost', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId }),
			})
				.then(response => {
					if (response.ok) {
						setPosts(posts.filter(post => post.id !== postId));
					}
				});
		}
	};

	const handleEditPost = (postId, newContent) => {
		fetch('http://localhost:5001/editPost', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId, newContent }),
		})
			.then(response => response.json())
			.then(updatedPost => {
				const updatedPosts = posts.map(post => {
					if (post.id === postId) {
						return updatedPost;
					}
					return post;
				});
				setPosts(updatedPosts);
			});
	};

	const sortedPosts = [...posts].sort((a, b) => {
		if (filter === 'likes') {
			return b.likes - a.likes;
		} else if (filter === 'oldest') {
			return new Date(a.timestamp) - new Date(b.timestamp);
		} else {
			return new Date(b.timestamp) - new Date(a.timestamp);
		}
	});

	return (
		<div className="feedContainer">
			<h2>Feed</h2>
			<div className="createPostContainer">
				<img src={currentUser.profilePic} alt="Profile" className="userProfilePic" />
				<input
					type="text"
					value={newPost}
					onChange={e => setNewPost(e.target.value)}
					placeholder="What's on your mind?"
				/>
				<button onClick={handleCreatePost}>Post</button>
			</div>
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
								<img src={post.userProfilePic} alt="User" className="postUserProfilePic" onClick={() => navigate(`/profile/${post.username}`)} />
								<div className="postUserInfo">
									<p className="postUsername">{post.username}</p>
									<p className="postTimestamp">{post.createdAt}</p>
								</div>
							</div>
							<p className="postContent">{post.content}</p>
							<button className="likeButton" onClick={() => handleAddLike(post.id)}>
								Like ({post.likes})
							</button>
							{post.username === currentUser.username && (
								<div className="postActions">
									<button onClick={() => handleDeletePost(post.id)}>Delete</button>
									<button onClick={() => {
										const newContent = prompt('Edit your post:', post.content);
										if (newContent) {
											handleEditPost(post.id, newContent);
										}
									}}>Edit</button>
								</div>
							)}
						</div>
						{/* Kommentarsektion */}
						<div className="commentsSection">
							{post.comments && post.comments.map((comment) => (
								<div key={comment.id} className="comment">
									<img src={comment.userProfilePic} alt="Comment User" className="commentUserProfilePic" onClick={() => navigate(`/profile/${comment.username}`)} />
									<div>
										<p className="commentUsername">{comment.username}</p>
										<p className="commentContent">{comment.content}</p>
										<p className="commentTimestamp">{comment.createdAt}</p>
									</div>
									<button className="likeButton">
										Like (0)
									</button>
								</div>
							))}
							<div className="addCommentSection">
								<input
									type="text"
									value={newComment[post.id] || ''}
									onChange={(e) => handleCommentChange(e, post.id)}
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
