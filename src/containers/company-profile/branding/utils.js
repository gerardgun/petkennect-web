function previewImage(event, image_id){
    const image = document.getElementById(image_id);
    let reader = new FileReader();
        
      reader.onload = function(){
        image.src = reader.result;
      };
       
    reader.readAsDataURL(event.target.files[0]);
}

export {
    previewImage
}