const PLANO_CATASTRO_TYPE = [
    {
        title: 'Medida',
        status: 'pending'
    },
    {
        title: 'APT',
        status: 'pending'
    },
    {
        title: 'Status',
        status: 'pending'
    },
    {
        title: 'Municipalidad',
        status: 'pending'
    },
    {
        title: 'Visado',
        status: 'pending'
    },
    {
        title: 'Inscrito',
        status: 'pending'
    },
    {
        title: 'Pago',
        status: 'pending'
    }
]

const REPORTES_CURVAS_TYPE = [
    {
        title: 'Visita',
        status: 'pending'
    },
    {
        title: 'Dibujo',
        status: 'pending'
    },
    {
        title: 'Reporte',
        status: 'pending'
    },
    {
        title: 'Correo',
        status: 'pending'
    },
    {
        title: 'Pago',
        status: 'pending'
    },
]

export const defaultTasks = (projectType) => {
    return projectType === 'PLANO_CATASTRO' ? PLANO_CATASTRO_TYPE : REPORTES_CURVAS_TYPE
}  