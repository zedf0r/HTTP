export class TicketView {
    constructor() {
        
    }

    displayTickets(tickets) {
        if (tickets.length) {
            tickets.forEach(ticket => {
                Init(ticket.id, ticket.name, ticket.created, ticket.status)
            });
        } else {
            Init(tickets.id, tickets.name, tickets.created, tickets.status)
        }
    }

    displayDescription(ticket) {
        showDescription(ticket.id, ticket.description)
    }
}

function Init(id, name, time, status) {
    const body = document.querySelector('.container')
    const date = new Date(time);
    const formattedDate = date.toLocaleString();
    let statusStyle = '';
    if (status) {
        statusStyle = 'active'
    }
    const template = `
    <div class="ticket" data-id="${id}">
        <div class="ticket-header">
            <div class="ticket-content">
                <div class="circle ticket-status ${statusStyle}">
                    <div></div>
                    <div></div>
                </div>
                <span>${name}</span>
            </div>
            <div class="ticket-information">
                <span>${formattedDate}</span>
                <div class="ticket-information-edit">
                    <div class="circle ticket-edit">
                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"/>
                        </svg>
                    </div>
                    <div class="circle ticket-delete">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    body.innerHTML += template
}

export function showDescription(ticket, description) {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('ticket-footer');
    tempDiv.innerHTML = `
        <span>${description}</span>
    `;

    ticket.appendChild(tempDiv)
}
