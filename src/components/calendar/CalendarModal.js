import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const customStyles = {
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
   },
 };

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const end = now.clone().add(1,'hours');


export const CalendarModal = () => {

   const [ dateStart, setDateStart ] = useState(now.toDate());
   const [ dateEnd, setDateEnd ] = useState( end.toDate() );

   const [ formValues, setFormValues ] = useState({
      title: 'Evento',
      notes: '',
      start: now.toDate(),
      end: end.toDate()
   });

   const { notes, title } = formValues;

   const handleInputChange=({ target })=>{

      setFormValues({
         ...formValues,
         //las llaves cuadradas para computar el nombre de la propiedad
         [target.name]: target.value
      });
   }

   const closeModal=()=>{
      // setIsOpen(false);
   }

   const handleStartDateChange = (e) => {
      // console.log(e);
      setDateStart( e );
      setFormValues({
         ...formValues,
         start: e
      });
   }
   const handleEndDateChange = (e) => {
      // console.log(e);
      setDateEnd( e );
      setFormValues({
         ...formValues,
         end: e
      });
   }

   const handleSubmitForm = (e)=>{
      e.preventDefault();
      console.log(formValues);
   }

   return (
      
      <Modal
         isOpen={true}
         onRequestClose={closeModal}
         style={customStyles}
         className="modal"
         overlayClassName="modal-fondo"
         closeTimeoutMS={200}
      >
         <h1> Nuevo evento </h1>
         <hr />
         <form 
            onSubmit={ handleSubmitForm }
            className="container">

            <div className="form-group">
               <label>Fecha y hora inicio</label>
               {/* <input className="form-control" placeholder="Fecha inicio" /> */}
               <DateTimePicker
                  onChange={ handleStartDateChange }
                  value={ dateStart }
                  className="form-control"
               />
            </div>

            <div className="form-group">
               <label>Fecha y hora fin</label>
               {/* <input className="form-control" placeholder="Fecha inicio" /> */}
               <DateTimePicker
                  onChange={ handleEndDateChange }
                  value={ dateEnd }
                  minDate={ dateStart }
                  className="form-control"
               />
            </div>

            <hr />
            <div className="form-group">
               <label>Titulo y notas</label>
               <input 
                     type="text" 
                     className="form-control"
                     placeholder="Título del evento"
                     name="title"
                     autoComplete="off"
                     value={title}
                     onChange={ handleInputChange }
               />
               <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
               <textarea 
                     type="text" 
                     className="form-control"
                     placeholder="Notas"
                     rows="5"
                     name="notes"
                     value={ notes }
                     onChange={ handleInputChange }
               ></textarea>
               <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
               type="submit"
               className="btn btn-outline-primary btn-block"
            >
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>

         </form>
      </Modal>
   );
};