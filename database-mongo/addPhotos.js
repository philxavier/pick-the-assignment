const { postModel } = require('./index');

let pictures = [{
  src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
  thumbnail: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
  thumbnailWidth: 30,
  thumbnailHeight: 30,
  isSelected: true,
  caption: 'After Rain (Jeshu John - designerspics.com)'
},
{
  src: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
  thumbnail: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
  thumbnailWidth: 30,
  thumbnailHeight: 30,
  caption: 'Boats (Jeshu John - designerspics.com)'
},
 
{
  src: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  thumbnail: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  thumbnailWidth: 30,
  thumbnailHeight: 30
},

{
  src: 'https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1060&q=80',
  thumbnail: 'https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1060&q=80',
  thumbnailWidth: 20,
  thumbnailHeight: 30
}


];

let updateDocument = () => {
  postModel.updateMany({$set: { 'photos': pictures } }, (err, res) => {
    if (err) {
      console.log('there was a problem updating');
    } else {
      console.log('updated records');
    }
  });
};

updateDocument();
