import React, { useState, useEffect, useContext } from 'react';
import { IoAddCircleOutline, IoSearch, IoFunnel } from 'react-icons/io5';
import { AuthContext } from '../../context/auth.context';
import Loading from '../../Components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientTable from '../../Components/ClientTable/ClientTable';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [clients] = useState(localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : []);

    const [EditToggle, setEditToggle] = useState(false);



    const [filteredClients, setFilteredClients] = useState([]);
    const [filtersCompany, setFiltersCompany] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleFilters = (e) => {
        const clientsData = localStorage.getItem('clients');
        if (clientsData) {
            const clients = JSON.parse(clientsData);
            const companyNames = clients.map(client => client.company).filter((value, index, self) => value !== "" && self.indexOf(value) === index).map((company, index) => ({ id: index, name: company }));
            setFiltersCompany(companyNames);
        }
    }

    const handleFilterCompany = (e) => {
        const company = e.target.value;
        const filteredClients = clients.filter(client => {
            return (
                client.company.toLowerCase().includes(company.toLowerCase())
            );
        });
        setSelectedIndex(e.target.index);
        setFilteredClients(filteredClients);
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredClients = clients.filter(client => {
            return (
                client.name.toLowerCase().includes(searchValue)
            );
        });
        setFilteredClients(filteredClients);
        if (filteredClients.length === 0) {
            setFilteredClients([{ id: 0, name: 'No registries found', email: '', phoneNumber: '', address: '', company: '' }]);
        }
    }

    const handleResetFilter = () => {
        const clientsData = clients.filter(client => client.user === user.email).sort((a, b) => a.id - b.id);
        setFilteredClients(clientsData);
        const selectFilter = document.getElementById('selectFilter');
        selectFilter.selectedIndex = 0;
        setSelectedIndex(selectFilter.selectedIndex);
    }

    const ExportJson = () => {
        const filteredClients = clients.filter(client => client.user === user.email);
        const data = JSON.stringify(filteredClients);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'clients.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        if (user) {
            setFilteredClients(clients.filter(client => client.user === user.email).sort((a, b) => a.id - b.id));
            setLoading(false);
        }
    }, [user, clients]);

    useEffect(() => {
        const selectIndex = document.getElementById('selectFilter').selectedIndex = 0;
        setSelectedIndex(selectIndex);
    }, []);

    return (
        <div>
            <ToastContainer newestOnTop />
            <div className="ml-64 pt-2 mr-3">
                <div className='justify-between flex pb-3'>
                    <div className='flex gap-x-2'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" onChange={handleSearch} />
                            <IoSearch className="h-5 w-5" />
                        </label>
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details>
                                    <summary>
                                        <IoFunnel className="h-5 w-5" />
                                    </summary>
                                    <ul className="p-2 bg-base-300 w-80 z-10 grid grid-rows-2 " onClick={() => handleFilters()}>
                                        <div className='row-span-1'>
                                            <p className='text-center my-2'>Filters</p>
                                        </div>
                                        <div className='flex gap-x-2'>
                                            <select className="select select-bordered w-full min-w-56" id='selectFilter'>
                                                <option disabled selected>Company</option>
                                                {filtersCompany.map((company) => (
                                                    <option key={company.id} value={company.name} onClick={(e) => handleFilterCompany(e)}>{company.name}</option>
                                                ))}
                                            </select>
                                            {selectedIndex !== 0 && <button className='btn btn-primary' onClick={() => handleResetFilter()}> X </button>}
                                        </div>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                    <div className='gap-x-2 flex'>
                        <button className="btn btn-accent" onClick={() => ExportJson()}><IoAddCircleOutline className="h-5 w-5" />Export to JSON</button>
                        <button className="btn btn-primary" onClick={() => setEditToggle(!EditToggle)}><IoAddCircleOutline className="h-5 w-5" />Edit</button>
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_create').showModal()}><IoAddCircleOutline className="h-5 w-5" />New Client</button>
                    </div>
                </div>
                {!loading ? <ClientTable filteredClients={filteredClients} EditToggle={EditToggle} />
                    : <Loading />}
            </div>
        </div>
    );
}

export default Dashboard;