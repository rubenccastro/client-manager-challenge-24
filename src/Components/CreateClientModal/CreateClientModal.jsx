import React, { useContext, useState } from 'react';
import { IoPerson, IoMail, IoCall, IoLocation, IoBusiness } from 'react-icons/io5';
import { AuthContext } from '../../context/auth.context';
import { toast } from 'react-toastify';

const CreateClientModal = ({ onCreateClient }) => {

    const { user } = useContext(AuthContext);

    const [clients, setClients] = useState(localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : []);

    const [ClientsName, setClientsName] = useState('');
    const [ClientsEmail, setClientsEmail] = useState('');
    const [ClientsPhoneNumber, setClientsPhoneNumber] = useState('');
    const [ClientsAddress, setClientsAddress] = useState('');
    const [ClientsCompany, setClientsCompany] = useState('');

    const handleClientsName = (e) => {
        setClientsName(e.target.value);
    }
    const handleClientsEmail = (e) => {
        setClientsEmail(e.target.value);
    }
    const handleClientsPhoneNumber = (e) => {
        setClientsPhoneNumber(e.target.value.replace(/\D/g, ''));
    }
    const handleClientsAddress = (e) => {
        setClientsAddress(e.target.value);
    }
    const handleClientsCompany = (e) => {
        setClientsCompany(e.target.value);
    }

    const handleClientsCreation = (e) => {
        e.preventDefault();
        if (!ClientsName || !ClientsEmail || !ClientsPhoneNumber || !ClientsAddress || !ClientsCompany) {
            toast.error("Please fill all the fields!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (!ClientsEmail.includes('@') || !ClientsEmail.includes('.')) {
            toast.error("Please enter a valid email!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (ClientsPhoneNumber.length < 10) {
            toast.error("Please enter a valid phone number!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (ClientsCompany.length < 3) {
            toast.error("Please enter a valid company name!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (ClientsAddress.length < 3) {
            toast.error("Please enter a valid address!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const maxId = clients.reduce((max, client) => (client.id > max ? client.id : max), 0);
        const newClientId = maxId + 1;

        const newClient = {
            id: newClientId,
            name: ClientsName,
            email: ClientsEmail,
            phoneNumber: ClientsPhoneNumber,
            address: ClientsAddress,
            company: ClientsCompany,
            user: user.email
        };

        const updatedClients = [...clients, newClient];
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients));
        onCreateClient(newClient);

        document.getElementById('my_modal_create').close();
        toast.success("Successfully Created", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        // Reset input fields
        setClientsName('');
        setClientsEmail('');
        setClientsPhoneNumber('');
        setClientsAddress('');
        setClientsCompany('');
    }


    return (
        <dialog id="my_modal_create" className="modal">
            <div className="modal-box">
                <div className="modal-action justify-center mt-0">
                    <form onSubmit={handleClientsCreation} className='flex flex-col gap-y-4'>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoPerson className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Name" onChange={handleClientsName} required value={ClientsName} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoMail className="h-5 w-5" />
                            <input type="email" className="grow" placeholder="Email" onChange={handleClientsEmail} required value={ClientsEmail} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoCall className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Phone Number" onChange={handleClientsPhoneNumber} required value={ClientsPhoneNumber} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoLocation className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Address" onChange={handleClientsAddress} required value={ClientsAddress} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoBusiness className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Company" onChange={handleClientsCompany} required value={ClientsCompany} />
                        </label>
                        <button type="submit" className='btn btn-primary'>Create New Client</button>
                    </form>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_create').close()}>✕</button>
                </div>
            </div>
        </dialog>
    );
};

export default CreateClientModal;
