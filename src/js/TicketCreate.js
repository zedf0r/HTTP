// import { sendRequest } from "./request";
// import { TicketView } from "./TicketView";

// export class CreateTicket {
//     constructor() {

//         this.init();
//         // this.buttonTicket = document.querySelector('.btn-add-ticket');

//         // this.shortDescriptionInput = document.querySelector('#short1');
//         // this.longDescriptionInput = document.querySelector('#long1');

//         // this.cancelButton = document.querySelector('button[type=button]');
//         // this.submitButton = this.formAddTicket.querySelector('button[type=submit]');

//         // this.openForm = this.openForm.bind(this);
//         // this.closeForm = this.closeForm.bind(this);
//     }

//     init() {
//         document.addEventListener('click', (e) => {
//             const target = e.target;

//             if(target.closest('.btn-add-ticket')) {
//                 this.openForm();
//             }

//             if (target.closest) {

//             }
//         })
//         // this.submitButton.addEventListener('click', (event) => this.submitForm(event))
//         // this.cancelButton.addEventListener('click', this.closeForm)
//     }

//     openForm() {
//         this.modalOverlay.classList.remove('hidden');
//         this.formAddTicket.classList.remove('hidden')
//     }

//     closeForm() {
//         // this.formAddTicket.classList.add('hidden')
//         // this.modalOverlay.classList.add('hidden')
//     }

//     submitForm(event) {
//         event.preventDefault()

//         const shortValue = this.shortDescriptionInput.value;
//         const longValue = this.longDescriptionInput.value;

//         const formData = {
//             id: null,
//             name: shortValue,
//             description: longValue,
//             status: false,
//         }

//         sendRequest('POST', '?method=createTicket', formData)
//             .then(response => {
//                 const ticketView = new TicketView()
//                 ticketView.displayTickets(response)
//             })
//         this.closeForm();
//     }
// }