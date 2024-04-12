import React from 'react';
import { toast } from 'react-toastify';

const DeleteClientModal = ({ clientToDelete, confirmDeleteClient }) => {
    const handleDeleteClientUpdate = (e) => {
        e.preventDefault();
        confirmDeleteClient(clientToDelete);
        const clients = JSON.parse(localStorage.getItem('clients'));
        const newClients = clients.filter(client => client.id !== clientToDelete.id);
        localStorage.setItem('clients', JSON.stringify(newClients));
        document.getElementById('my_modal_delete').close();
        toast.success("Successfully Deleted", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    return (
        <dialog id="my_modal_delete" className="modal">
            <div className="modal-box">
                <div className="modal-action justify-center mt-0">
                    <form className='flex flex-col gap-y-4' onSubmit={handleDeleteClientUpdate}>
                        <p>Are you sure you want to delete this client?</p>
                        <div className='flex justify-center gap-x-2'>
                            <button type="submit" className='btn btn-primary'>Yes</button>
                            <button type="button" className='btn btn-error' onClick={() => document.getElementById('my_modal_delete').close()}>No</button>
                        </div>
                    </form>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_delete').close()}>✕</button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteClientModal;
