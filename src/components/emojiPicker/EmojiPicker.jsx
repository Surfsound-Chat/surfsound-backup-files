import EmojiPicker from 'emoji-picker-react';
import "./emojiPicker.scss";
export const EmojisPicker=({emojiActive,setPostContent,postContent})=>{
  const onEmojiClick = (event,emojiObject) => {
    setPostContent({...postContent,content:postContent.content.concat(emojiObject?.emoji)});
  };
return(
    <div className={`emojipicker ${emojiActive?'active':''}`}>
    <EmojiPicker
    onEmojiClick={onEmojiClick}
    />
    </div>
)
}