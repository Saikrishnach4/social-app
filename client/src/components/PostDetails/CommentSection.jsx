import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';

// Toastify imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleComment = async () => {
    if (!user?.result?.name) {
      toast.warn("Please login first to comment.");
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1500);
    } else {
      try {
        setIsLoading(true); // start loading
        const newComments = await dispatch(
          commentPost(`${user.result.name}: ${comment}`, post._id)
        );
        setComment('');
        setComments(newComments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        toast.success(' Comment added successfully!');
      } catch (error) {
        toast.error(' Failed to add comment');
      } finally {
        setIsLoading(false); // stop loading
      }
    }
  };


  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}:</strong> {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment.length || isLoading}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            {isLoading ? 'Posting...' : 'Comment'}
          </Button>

        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CommentSection;
