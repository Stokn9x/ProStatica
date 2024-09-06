import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/FeedComponent.css';

const FeedComponent = ({ currentUser }) => {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState('');
	const [filter, setFilter] = useState('newest');
	const [newComment, setNewComment] = useState({});
	const [likedPosts, setLikedPosts] = useState(new Set());
	const [likedComments, setLikedComments] = useState(new Set());
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
		const isLiked = likedPosts.has(postId);
		const action = isLiked ? 'unlike' : 'like';

		fetch('http://localhost:5001/likePost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId,
				username: currentUser.username,
				action
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(isLiked ? 'User has not liked this post.' : 'User has already liked this post.');
				}
				return response.json();
			})
			.then(updatedPost => {
				const updatedPosts = posts.map(post => {
					if (post.id === postId) {
						return updatedPost;
					}
					return post;
				});
				setPosts(updatedPosts);
				if (isLiked) {
					likedPosts.delete(postId);
				} else {
					likedPosts.add(postId);
				}
				setLikedPosts(new Set(likedPosts));
			})
			.catch(error => {
				console.error(error.message);
			});
	};

	const handleAddCommentLike = (postId, commentId) => {
		const isLiked = likedComments.has(commentId);
		const action = isLiked ? 'unlike' : 'like';

		fetch('http://localhost:5001/likeComment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId,
				commentId,
				username: currentUser.username,
				action
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(isLiked ? 'User has not liked this comment.' : 'User has already liked this comment.');
				}
				return response.json();
			})
			.then(updatedComment => {
				const updatedPosts = posts.map(post => {
					if (post.id === postId) {
						const updatedComments = post.comments.map(comment => {
							if (comment.id === commentId) {
								return updatedComment;
							}
							return comment;
						});
						return { ...post, comments: updatedComments };
					}
					return post;
				});
				setPosts(updatedPosts);
				if (isLiked) {
					likedComments.delete(commentId);
				} else {
					likedComments.add(commentId);
				}
				setLikedComments(new Set(likedComments));
			})
			.catch(error => {
				console.error(error.message);
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
				comment: commentText,
				likes: 0,
				likedBy: []
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
		fetch('http://localhost:5001/deletePost', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId }),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to delete post.');
				}
				setPosts(posts.filter(post => post.id !== postId));
			})
			.catch(error => {
				console.error(error.message);
			});
	};

	const handleEditPost = (postId, newContent) => {
		fetch('http://localhost:5001/editPost', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId, newContent }),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to edit post.');
				}
				return response.json();
			})
			.then(updatedPost => {
				const updatedPosts = posts.map(post => {
					if (post.id === postId) {
						return updatedPost;
					}
					return post;
				});
				setPosts(updatedPosts);
			})
			.catch(error => {
				console.error(error.message);
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
									<button className="likeButton" onClick={() => handleAddCommentLike(post.id, comment.id)}>
										Like ({comment.likes})
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
