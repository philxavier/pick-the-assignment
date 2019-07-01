import React from 'react';
import { Header,  Modal } from 'semantic-ui-react'

const PlaceHolder = ({...rest }) => (
  <div style={{width:"22px", height:"27px", position:"absolute", zIndex:"2"}}{...rest }></div>
)

const ModalExample = (props) => (
   
  <Modal onClose={() => {props.handleMouseLeave()}} trigger={<PlaceHolder />}closeIcon>
  <Modal.Header>Select a Photo</Modal.Header>
  <Modal.Content image>
    <Image wrapped size='medium' src={props.src} />
    <Modal.Description>
      <Header>Consulate General of Brazil in {props.nameOfCity}</Header>
      <div style={{height:"100%", width:"35em", overflowWrap:"break-word", overflowY: "visible", textAlign:"justify"}}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Vitae purus faucibus ornare suspendisse sed nisi lacus. Arcu felis bibendum ut tristique et egestas quis. Donec ultrices tincidunt arcu non sodales. Risus commodo viverra maecenas accumsan lacus vel facilisis. Fermentum dui faucibus in ornare. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Fames ac turpis egestas integer eget aliquet nibh. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Mi proin sed libero enim sed faucibus turpis in. Fringilla phasellus faucibus scelerisque eleifend. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Quis imperdiet massa tincidunt nunc.
          </p>
      </div>     
    </Modal.Description>
  </Modal.Content>
</Modal>

)