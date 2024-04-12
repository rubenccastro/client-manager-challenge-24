import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import EditClientModal from '../EditClientModal/EditClientModal';
import CreateClientModal from '../../Components/CreateClientModal/CreateClientModal';
import DeleteClientModal from '../DeleteClientModal/DeleteClientModal';

function ClientTable({ filteredClients, EditToggle }) {
    const { user } = useContext(AuthContext);
    const [editClient, setEditClient] = useState({});
    const [Clients, setClients] = useState(filteredClients);
    const [clientToDelete, setClientToDelete] = useState(null);

    const handleEditClient = (client) => {
        setEditClient(client);
        document.getElementById('my_modal_edit').showModal();
    };

    const handleCreateClient = (newClient) => {
        setClients([...Clients, newClient]);
    };

    const handleDeleteClient = (client) => {
        setClientToDelete(client);
        document.getElementById('my_modal_delete').showModal();
    };

    const confirmDeleteClient = () => {
        setClients(prevClients => prevClients.filter(c => c.id !== clientToDelete.id));
        setClientToDelete(null);
    };

    const handleClientUpdateEdit = (updatedClient) => {
        const index = filteredClients.findIndex(client => client.id === updatedClient.id);
        const updatedClients = [...filteredClients];
        updatedClients[index] = updatedClient;
        setClients(updatedClients);
    };

    return (
        <div>
            <table className="table table-zebra table-fixed">
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Company</th>
                        {EditToggle && <th>Edit</th>}
                    </tr>
                </thead>
                <tbody>
                    {user && Clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phoneNumber}</td>
                            <td>{client.address}</td>
                            <td>{client.company}</td>
                            {EditToggle && <td>
                                <div className='flex justify-center align-middle gap-x-2'>
                                    <button className="btn btn-primary btn-sm" onClick={() => handleEditClient(client)}>Edit</button>
                                    <button className="btn btn-error btn-sm" onClick={() => handleDeleteClient(client)}>Delete</button>
                                </div>
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditClientModal
                editClient={editClient}
                handleClientUpdate={handleClientUpdateEdit}
            />
            <CreateClientModal onCreateClient={handleCreateClient} />
            <DeleteClientModal
                editClient={editClient}
                clientToDelete={clientToDelete}
                confirmDeleteClient={confirmDeleteClient}
            />
        </div>
    );
}

export default ClientTable;