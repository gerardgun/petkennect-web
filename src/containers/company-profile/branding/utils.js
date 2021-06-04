function previewImage(event, image_id){
    const image = document.getElementById(image_id);
    let reader = new FileReader();
        
      reader.onload = function(){
        image.src = reader.result;
      };
       
    reader.readAsDataURL(event.target.files[0]);
}

function deleteImage(image_id){
  const image = document.getElementById(image_id);
  image.src = '';
}

export {
    previewImage,
    deleteImage
}