function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad1 = null;
let signaturePad2 = null;

window.addEventListener('load', async () => {

    
    const canvas1 = document.querySelector("canvas[name=signaturePad1]");
    canvas1.height = canvas1.offsetHeight;
    canvas1.width = canvas1.offsetWidth;

    const canvas2 = document.querySelector("canvas[name=signaturePad2]");
    canvas2.height = canvas2.offsetHeight;
    canvas2.width = canvas2.offsetWidth;

    signaturePad1 = new SignaturePad(canvas1, {});
    signaturePad2 = new SignaturePad(canvas2, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

          let nombreTec = document.getElementById('nombreTec').value;
          let nombreU = document.getElementById('nombreU').value;
          let fecha = document.getElementById('fecha').value;
          let tipoServicio = document.getElementById('tipoServicio').value;
          let dependencia = document.getElementById('dependencia').value;
          let ticket = document.getElementById('ticket').value;
          let placa = document.getElementById('placa').value;
          var detalle = document.getElementById('detalle').value;

        generatePDF(nombreTec, nombreU, fecha, tipoServicio, dependencia, ticket, placa, detalle);
    })

});

async function generatePDF(nombreTec, nombreU, fecha, tipoServicio, dependencia, ticket, placa, detalle) {
    const image = await loadImage("formulario.jpg");
    const signatureImage1 = signaturePad1.toDataURL();
    const signatureImage2 = signaturePad2.toDataURL();


    const pdf = new jsPDF('p', 'pt', 'letter');

    var splitDetalle = pdf.splitTextToSize(detalle, 420)

    pdf.addImage(image, 'PNG', 0, 0, 530, 792);
    pdf.addImage(signatureImage1, 'PNG', 300, 600, 170, 70);
   pdf.addImage(signatureImage2, 'PNG', 50, 600, 170, 70);
   pdf.setFontSize(12);
   pdf.setFontSize(10);
   pdf.text(nombreTec, 175, 190);
   pdf.text(nombreU, 177, 287);
   pdf.text(fecha, 150, 134);
   pdf.text(tipoServicio, 165, 266);
   pdf.text(dependencia, 177, 299);
   pdf.text(ticket, 177, 313);
   pdf.text(placa, 177, 328);
   pdf.text(splitDetalle, 178, 360);
   pdf.setFillColor(0,0,0);
   
   

    pdf.save(`${nombreU}_acta.pdf`);

   }