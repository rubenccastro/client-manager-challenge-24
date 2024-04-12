import React, { useEffect, useState } from 'react';
import { IoPerson, IoMail, IoCall, IoLocation, IoBusiness } from 'react-icons/io5';
import { toast } from 'react-toastify';

const EditClientModal = ({ editClient, handleClientUpdate }) => {
    const [editedClient, setEditedClient] = useState(editClient);
    const [clients, setClients] = useState(JSON.parse(localStorage.getItem('clients')) || []);

    useEffect(() => {
        setEditedClient(editClient);
    }, [editClient]);

    const handleEditClientsName = (e) => {
        setEditedClient({ ...editedClient, name: e.target.value });
    }

    const handleEditClientsEmail = (e) => {
        setEditedClient({ ...editedClient, email: e.target.value });
    }

    const handleEditClientsPhoneNumber = (e) => {
        setEditedClient({ ...editedClient, phoneNumber: e.target.value.replace(/\D/g, '') });
    }

    const handleEditClientsAddress = (e) => {
        setEditedClient({ ...editedClient, address: e.target.value });
    }

    const handleEditClientsCompany = (e) => {
        setEditedClient({ ...editedClient, company: e.target.value });
    }

    const handleeditedClientUpdate = (e) => {
        e.preventDefault();
        if (!editedClient.name && !editedClient.email && !editedClient.phoneNumber && !editedClient.address && !editedClient.company) {
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
        } else if (!editedClient.email.includes('@') || !editedClient.email.includes('.')) {
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
        } else if (editedClient.phoneNumber.length < 10) {
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
        } else if (editedClient.company.length < 3) {
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
        } else if (editedClient.address.length < 3) {
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
        const newClients = clients.map((client) => {
            if (client.id === editedClient.id) {
                return editedClient;
            }
            return client;
        });
        setClients(newClients);
        localStorage.setItem('clients', JSON.stringify(newClients));
        handleClientUpdate(editedClient);
        document.getElementById('my_modal_edit').close();
        toast.success("Sucessfully Edited", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <dialog id="my_modal_edit" className="modal">
            <div className="modal-box">
                <div className="modal-action justify-center mt-0">
                    <form className='flex flex-col gap-y-4' onSubmit={handleeditedClientUpdate}>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoPerson className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Name" value={editedClient.name || ""} required onChange={handleEditClientsName} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoMail className="h-5 w-5" />
                            <input type="email" className="grow" placeholder="Email" value={editedClient.email || ""} required onChange={handleEditClientsEmail} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoCall className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Phone Number" value={editedClient.phoneNumber || ""} required onChange={handleEditClientsPhoneNumber} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoLocation className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Address" value={editedClient.address || ""} required onChange={handleEditClientsAddress} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <IoBusiness className="h-5 w-5" />
                            <input type="text" className="grow" placeholder="Company" value={editedClient.company || ""} required onChange={handleEditClientsCompany} />
                        </label>

                        <button type="submit" className='btn btn-primary'>Update Client</button>
                    </form>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_edit').close()}>✕</button>
                </div>
            </div>
        </dialog>
    );
};

export default EditClientModal;
