import { v4 as uuidv4 } from 'uuid';

export const dummyClients = [
    {
        id: uuidv4(),
        name: 'Luc Dubois',
        email: 'luc.dubois@example.be',
        city: 'Bruxelles',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Sophie Martin',
        email: 'sophie.martin@example.be',
        city: 'Bruxelles',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Pierre Lefevre',
        email: 'pierre.lefevre@example.be',
        city: 'Liège',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Marie Dubois',
        email: 'marie.dubois@example.be',
        city: 'Anvers',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Jean Dupont',
        email: 'jean.dupont@example.be',
        city: 'Bruxelles',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Claire Lefevre',
        email: 'claire.lefevre@example.be',
        city: 'Bruxelles',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Paul Martin',
        email: 'paul.martin@example.be',
        city: 'Bruxelles',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Laura Dubois',
        email: 'laura.dubois@example.be',
        city: 'Anvers',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Antoine Lefevre',
        email: 'antoine.lefevre@example.be',
        city: 'Liège',
        country: 'Belgique'
    },
    {
        id: uuidv4(),
        name: 'Isabelle Martin',
        email: 'isabelle.martin@example.be',
        city: 'Bruxelles',
        country: 'Belgique'
    },
];

export const dummyVehicles = [
    {
        id: uuidv4(),
        model: 'Tesla Model 3',
        year: 2021,
        isAvailable: true,
    },
    {
        id: uuidv4(),
        model: 'BMW i3',
        year: 2020,
        isAvailable: false,
    },
    {
        id: uuidv4(),
        model: 'Audi e-tron',
        year: 2021,
        isAvailable: true,
    },
    {
        id: uuidv4(),
        model: 'Renault Zoe',
        year: 2019,
        isAvailable: true,
    },
    {
        id: uuidv4(),
        model: 'Peugeot e-208',
        year: 2020,
        isAvailable: true,
    },
    {
        id: uuidv4(),
        model: 'Nissan Leaf',
        year: 2021,
        isAvailable: false,
    },
    {
        id: uuidv4(),
        model: 'Hyundai Kona Electric',
        year: 2021,
        isAvailable: true,
    },
    {
        id: uuidv4(),
        model: 'Volkswagen ID.3',
        year: 2021,
        isAvailable: true,
    },
    {
        id: uuidv4(),
        model: 'Mercedes-Benz EQC',
        year: 2021,
        isAvailable: false,
    },
    {
        id: uuidv4(),
        model: 'Jaguar I-PACE',
        year: 2021,
        isAvailable: true,
    },
];

export const dummyRentals = [
    {
        id: uuidv4(),
        clientId: dummyClients[0].id,
        vehicleId: dummyVehicles[0].id,
        model: dummyVehicles[0].model,
        clientName: dummyClients[0].name,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-03'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[1].id,
        vehicleId: dummyVehicles[1].id,
        model: dummyVehicles[1].model,
        clientName: dummyClients[1].name,
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-01-04'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[2].id,
        vehicleId: dummyVehicles[2].id,
        model: dummyVehicles[2].model,
        clientName: dummyClients[2].name,
        startDate: new Date('2024-01-03'),
        endDate: new Date('2024-01-05'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[3].id,
        vehicleId: dummyVehicles[3].id,
        model: dummyVehicles[3].model,
        clientName: dummyClients[3].name,
        startDate: new Date('2024-01-04'),
        endDate: new Date('2024-01-06'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[4].id,
        vehicleId: dummyVehicles[4].id,
        model: dummyVehicles[4].model,
        clientName: dummyClients[4].name,
        startDate: new Date('2024-01-05'),
        endDate: new Date('2024-01-07'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[5].id,
        vehicleId: dummyVehicles[5].id,
        model: dummyVehicles[5].model,
        clientName: dummyClients[5].name,
        startDate: new Date('2024-01-06'),
        endDate: new Date('2024-01-08'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[6].id,
        vehicleId: dummyVehicles[6].id,
        model: dummyVehicles[6].model,
        clientName: dummyClients[6].name,
        startDate: new Date('2024-01-07'),
        endDate: new Date('2024-01-09'),
    },
    {
        id: uuidv4(),
        clientId: dummyClients[7].id,
        vehicleId: dummyVehicles[7].id,
        model: dummyVehicles[7].model,
        clientName: dummyClients[7].name,
        startDate: new Date('2024-01-08'),
        endDate: new Date('2024-01-10'),
    },
];