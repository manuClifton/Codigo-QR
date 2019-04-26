


document.addEventListener('DOMContentLoaded', function(){
    let selectorImg = document.querySelector('input[type=file]');
    let qr =document.querySelector('#qr');

    selectorImg.addEventListener('change', function(){
        let lector = new FileReader();
        lector.addEventListener('load', function(e){
            //  DECODIFICAR IMAGEN
            qrcode.decode(e.target.result)
            qr.style.display='block';
          //  ASIGNAR LA IMAGEN
            qr.src=e.target.result
        })
        //  LEER EL ARCHIVO
        lector.readAsDataURL(selectorImg.files[0])
    })

    let btnCamara = document.querySelector('#btnCamara');
    let btnCaptura = document.querySelector('#btnCaptura');

    btnCamara.addEventListener('click', iniciarCamara);
    btnCaptura.addEventListener('click', capturarQR);
})

    qrcode.callback=function(data){
    let salida = document.querySelector('output')
    salida.innerHTML= "Datos del QR"+ data;
}

function iniciarCamara(){
    if(navigator.getUserMedia != undefined){
        navigator.getUserMedia({video: true, audio:false}, function(localMediaStream){
            let video = document.querySelector('video');
            video.src = window.URL.createObjectURL(localMediaStream)
            video.play()
        }, function(){
            alert('error al abrir la camara')
        })

    }else{alert('No existe camara disponible')}
}

function capturarQR(){

            let video = document.querySelector('video');
            var canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 480;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            let img = canvas.toDataURL('image/jpeg');
            qrcode.decode(img);
}











