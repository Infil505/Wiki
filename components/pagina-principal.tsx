"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface Donation {
  id: string
  name: string
  type: string
  quantity: number
  image: string
  status: 'pending' | 'accepted' | 'delivered'
}

interface Request {
  id: string
  beneficiaryName: string
  address: string
  needs: string
  status: 'pending' | 'approved' | 'rejected'
}

interface User {
  id: string
  username: string
  password: string
  type: 'administrador' | 'beneficiario' | 'restaurante'
}

interface Campaign {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  goal: number
  current: number
}

const ADMIN_CODE = "ADMIN123"

export default function FoodCollectionApp() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success')
  const [selectedReport, setSelectedReport] = useState('campanas')
  const [showAddDonationForm, setShowAddDonationForm] = useState(false)
  const [userType, setUserType] = useState<'administrador' | 'beneficiario' | 'restaurante' | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [registerUserType, setRegisterUserType] = useState<'beneficiario' | 'restaurante'>('beneficiario')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    // Simulating data fetch from an API
    const fetchData = async () => {
      // In a real application, these would be API calls
      const mockDonations: Donation[] = [
        { id: '1', name: 'Restaurante A', type: 'Comida preparada', quantity: 50, image: '/placeholder.svg', status: 'pending' },
        { id: '2', name: 'Supermercado B', type: 'Alimentos no perecederos', quantity: 100, image: '/placeholder.svg', status: 'accepted' },
      ]
      const mockRequests: Request[] = [
        { id: '1', beneficiaryName: 'Juan Pérez', address: 'Calle 123, Ciudad', needs: 'Alimentos básicos', status: 'pending' },
        { id: '2', beneficiaryName: 'María García', address: 'Avenida 456, Pueblo', needs: 'Comida preparada', status: 'approved' },
      ]
      const mockCampaigns: Campaign[] = [
        { id: '1', name: 'Campaña de Verano', description: 'Recolección de alimentos para el verano', startDate: '2023-06-01', endDate: '2023-08-31', goal: 1000, current: 750 },
        { id: '2', name: 'Navidad Solidaria', description: 'Donaciones para las fiestas', startDate: '2023-12-01', endDate: '2023-12-25', goal: 500, current: 300 },
      ]

      setDonations(mockDonations)
      setRequests(mockRequests)
      setCampaigns(mockCampaigns)
    }

    fetchData()
  }, [])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setIsLoggedIn(true)
      setUserType(user.type)
      showNotificationMessage('Inicio de sesión exitoso', 'success')
    } else {
      showNotificationMessage('Credenciales incorrectas', 'error')
    }
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const adminCode = formData.get('adminCode') as string

    if (users.some(u => u.username === username)) {
      showNotificationMessage('El nombre de usuario ya existe', 'error')
      return
    }

    let type: 'administrador' | 'beneficiario' | 'restaurante' = registerUserType
    if (adminCode === ADMIN_CODE) {
      type = 'administrador'
    } else if (adminCode) {
      showNotificationMessage('Código de administrador incorrecto', 'error')
      return
    }

    const newUser: User = { id: Date.now().toString(), username, password, type }
    setUsers([...users, newUser])
    showNotificationMessage('Registro exitoso', 'success')
    setShowRegisterForm(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setActiveTab("inicio")
  }

  const handleDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const imageFile = formData.get('image') as File | null
    const newDonation: Donation = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('donationType') as string,
      quantity: Number(formData.get('quantity')),
      image: imageFile ? URL.createObjectURL(imageFile) : '/placeholder.svg',
      status: 'pending'
    }
    setDonations([...donations, newDonation])
    showNotificationMessage('Donación registrada con éxito', 'success')
    e.currentTarget.reset()
  }

  const handleRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newRequest: Request = {
      id: Date.now().toString(),
      beneficiaryName: formData.get('beneficiaryName') as string,
      address: formData.get('address') as string,
      needs: formData.get('needs') as string,
      status: 'pending'
    }
    setRequests([...requests, newRequest])
    showNotificationMessage('Solicitud enviada con éxito', 'success')
    e.currentTarget.reset()
  }

  const showNotificationMessage = (message: string, type: 'success' | 'error') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleEditDonation = (id: string) => {
    // Implement edit functionality
    console.log('Editing donation with id:', id)
  }

  const handleDeleteDonation = (id: string) => {
    setDonations(donations.filter(donation => donation.id !== id))
    showNotificationMessage('Donación eliminada con éxito', 'success')
  }

  const handleAddDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement add functionality
    console.log('Adding new donation')
    setShowAddDonationForm(false)
  }

  const handleAddCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      goal: Number(formData.get('goal')),
      current: 0
    }
    setCampaigns([...campaigns, newCampaign])
    showNotificationMessage('Campaña creada con éxito', 'success')
    e.currentTarget.reset()
  }

  return (
    <div className="container mx-auto p-4 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-800">Proyecto de Recolección de Alimentos</h1>

      {showNotification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {notificationType === 'success' ? <CheckCircle2 className="inline mr-2" /> : <AlertCircle className="inline mr-2" />}
          {notificationMessage}
        </div>
      )}

      {!isLoggedIn ? (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Acceso al Sistema</CardTitle>
            <CardDescription>Inicia sesión o regístrate para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            {!showRegisterForm ? (
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input id="username" name="username" placeholder="Tu nombre de usuario" required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" name="password" type="password" placeholder="Tu contraseña" required />
                  </div>
                </div>
                <Button type="submit" className="mt-4 bg-green-500 hover:bg-green-600">Iniciar Sesión</Button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input id="username" name="username" placeholder="Elige un nombre de usuario" required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" name="password" type="password" placeholder="Elige una contraseña" required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="userType">Tipo de Usuario</Label>
                    <Select onValueChange={(value) => setRegisterUserType(value as 'beneficiario' | 'restaurante')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beneficiario">Beneficiario</SelectItem>
                        <SelectItem value="restaurante">Restaurante/Donador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="adminCode">Código de Administrador (opcional)</Label>
                    <Input id="adminCode" name="adminCode" placeholder="Solo para administradores" />
                  </div>
                </div>
                <Button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600">Registrarse</Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => setShowRegisterForm(!showRegisterForm)}>
              {showRegisterForm ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <Button onClick={handleLogout} className="mb-4 bg-red-500 hover:bg-red-600">Cerrar Sesión</Button>

          {userType === 'beneficiario' ? (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600">Solicitar Alimentos</CardTitle>
                <CardDescription>Llena el formulario para solicitar asistencia alimentaria</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRequest}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="beneficiaryName">Nombre Completo</Label>
                      <Input id="beneficiaryName" name="beneficiaryName" placeholder="Tu nombre completo" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" name="address" placeholder="Tu dirección" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                
                      <Label htmlFor="needs">Descripción de Necesidades</Label>
                      <Textarea id="needs" name="needs" placeholder="Describe brevemente tu situación y necesidades" required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-yellow-500 hover:bg-yellow-600">Enviar Solicitud</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-green-100">
                <TabsTrigger value="inicio" className="data-[state=active]:bg-green-200">Inicio</TabsTrigger>
                {userType === 'restaurante' && (
                  <>
                    <TabsTrigger value="donaciones" className="data-[state=active]:bg-green-200">Donar</TabsTrigger>
                    <TabsTrigger value="historial" className="data-[state=active]:bg-green-200">Historial</TabsTrigger>
                  </>
                )}
                {userType === 'administrador' && (
                  <>
                    <TabsTrigger value="manageDonations" className="data-[state=active]:bg-green-200">Gestionar Donaciones</TabsTrigger>
                    <TabsTrigger value="manageRequests" className="data-[state=active]:bg-green-200">Gestionar Solicitudes</TabsTrigger>
                    <TabsTrigger value="campaigns" className="data-[state=active]:bg-green-200">Campañas</TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-green-200">Reportes</TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="inicio">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-700">Bienvenido al Proyecto de Recolección de Alimentos</CardTitle>
                    <CardDescription>Juntos podemos hacer la diferencia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-800">Este proyecto conecta restaurantes y personas dispuestas a donar alimentos con aquellos que lo necesitan. Contamos con un equipo dedicado de colaboradores que gestiona todo el proceso de recolección y distribución.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {userType === 'restaurante' && (
                <>
                  <TabsContent value="donaciones">
                    <Card className="bg-white shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Donar Alimentos</CardTitle>
                        <CardDescription>Restaurantes e individuos pueden donar aquí</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleDonation}>
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Nombre</Label>
                              <Input id="name" name="name" placeholder="Tu nombre o nombre del restaurante" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="donationType">Tipo de Donación</Label>
                              <Input id="donationType" name="donationType" placeholder="Alimentos no perecederos, comida preparada, etc." required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="quantity">Cantidad</Label>
                              <Input id="quantity" name="quantity" type="number" placeholder="Cantidad aproximada" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="image">Imagen del Producto</Label>
                              <Input id="image" name="image" type="file" accept="image/*" required />
                            </div>
                          </div>
                          <Button type="submit" className="mt-4 bg-green-500 hover:bg-green-600">Registrar Donación</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="historial">
                    <Card className="bg-white shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Historial de Donaciones</CardTitle>
                        <CardDescription>Registro de tus donaciones anteriores</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {donations.length > 0 ? (
                          donations.map((donation) => (
                            <div key={donation.id} className="border-b border-gray-300 p-4">
                              <h3 className="text-lg font-semibold">{donation.name}</h3>
                              <p>{donation.type} - Cantidad: {donation.quantity}</p>
                              <p>Estado: {donation.status}</p>
                            </div>
                          ))
                        ) : (
                          <p>No hay donaciones registradas.</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}

              {userType === 'administrador' && (
                <>
                  <TabsContent value="manageDonations">
                    <Card className="bg-white shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Gestionar Donaciones</CardTitle>
                        <CardDescription>Lista de donaciones registradas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {donations.length > 0 ? (
                          donations.map((donation) => (
                            <div key={donation.id} className="border-b border-gray-300 p-4 flex justify-between items-center">
                              <div>
                                <Avatar>
                                  <AvatarImage src={donation.image} alt={`Imagen de ${donation.name}`} />
                                  <AvatarFallback>Sin Imagen</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-semibold">{donation.name}</h3>
                                <p>{donation.type} - Cantidad: {donation.quantity}</p>
                                <p>Estado: {donation.status}</p>
                              </div>
                              <div>
                                <Button variant="outline" className="mr-2" onClick={() => handleEditDonation(donation.id)}>Editar</Button>
                                <Button variant="destructive" onClick={() => handleDeleteDonation(donation.id)}>Eliminar</Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No hay donaciones registradas.</p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => setShowAddDonationForm(true)}>Agregar Donación</Button>
                      </CardFooter>
                    </Card>
                    {showAddDonationForm && (
                      <Card className="mt-4 bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-xl text-green-700">Agregar Nueva Donación</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleAddDonation}>
                            <div className="grid w-full items-center gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" name="name" placeholder="Nombre del donante" required />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="donationType">Tipo de Donación</Label>
                                <Input id="donationType" name="donationType" placeholder="Tipo de alimentos" required />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="quantity">Cantidad</Label>
                                <Input id="quantity" name="quantity" type="number" placeholder="Cantidad" required />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="image">Imagen</Label>
                                <Input id="image" name="image" type="file" accept="image/*" required />
                              </div>
                            </div>
                            <Button type="submit" className="mt-4">Guardar Donación</Button>
                          </form>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="manageRequests">
                    <Card className="bg-white shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Gestionar Solicitudes</CardTitle>
                        <CardDescription>Lista de solicitudes recibidas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {requests.length > 0 ? (
                          requests.map((request) => (
                            <div key={request.id} className="border-b border-gray-300 p-4">
                              <h3 className="text-lg font-semibold">{request.beneficiaryName}</h3>
                              <p>{request.address} - Necesidades: {request.needs}</p>
                              <p>Estado: {request.status}</p>
                              <div className="mt-2">
                                <Button variant="outline" className="mr-2" onClick={() => console.log('Aprobar solicitud', request.id)}>Aprobar</Button>
                                <Button variant="destructive" onClick={() => console.log('Rechazar solicitud', request.id)}>Rechazar</Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No hay solicitudes registradas.</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="campaigns">
                    <Card className="bg-white shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Campañas</CardTitle>
                        <CardDescription>Gestión de campañas de donación</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {campaigns.map((campaign) => (
                          <div key={campaign.id} className="border-b border-gray-300 p-4">
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <p>{campaign.description}</p>
                            <p>Fecha: {campaign.startDate} - {campaign.endDate}</p>
                            <p>Progreso: {campaign.current} / {campaign.goal}</p>
                          </div>
                        ))}
                        <form onSubmit={handleAddCampaign} className="mt-4">
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Nombre de la Campaña</Label>
                              <Input id="name" name="name" placeholder="Nombre de la campaña" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="description">Descripción</Label>
                              <Textarea id="description" name="description" placeholder="Descripción de la campaña" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="startDate">Fecha de Inicio</Label>
                              <Input id="startDate" name="startDate" type="date" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="endDate">Fecha de Fin</Label>
                              <Input id="endDate" name="endDate" type="date" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="goal">Meta de Donaciones</Label>
                              <Input id="goal" name="goal" type="number" placeholder="Meta de donaciones" required />
                            </div>
                          </div>
                          <Button type="submit" className="mt-4">Crear Nueva Campaña</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reports">
                    <Card className="bg-white shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Reportes</CardTitle>
                        <CardDescription>Generación y visualización de reportes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-4 mb-4">
                          <Button variant="outline" onClick={() => setSelectedReport('campanas')}>Campañas</Button>
                          <Button variant="outline" onClick={() => setSelectedReport('donacionesAceptadas')}>Donaciones Aceptadas</Button>
                          <Button variant="outline" onClick={() => setSelectedReport('donacionesEntregadas')}>Donaciones Entregadas</Button>
                        </div>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            {selectedReport === 'campanas' ? (
                              <BarChart data={campaigns.map(c => ({ name: c.name, value: c.current }))}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                              </BarChart>
                            ) : selectedReport === 'donacionesAceptadas' ? (
                              <PieChart>
                                <Pie 
                                  dataKey="value" 
                                  data={[
                                    { name: 'Aceptadas', value: donations.filter(d => d.status === 'accepted').length },
                                    { name: 'Pendientes', value: donations.filter(d => d.status === 'pending').length },
                                  ]} 
                                  fill="#8884d8" 
                                  label 
                                />
                                <Tooltip />
                              </PieChart>
                            ) : (
                              <LineChart data={[
                                { name: 'Ene', value: 400 },
                                { name: 'Feb', value: 300 },
                                { name: 'Mar', value: 200 },
                                { name: 'Abr', value: 278 },
                                { name: 'May', value: 189 },
                              ]}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                              </LineChart>
                            )}
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          {selectedReport === 'campanas' && (
                            <p>Este gráfico muestra el progreso de las diferentes campañas de donación activas. Cada barra representa una campaña y su altura indica la cantidad de donaciones recibidas.</p>
                          )}
                          {selectedReport === 'donacionesAceptadas' && (
                            <p>Este gráfico circular muestra la proporción de donaciones aceptadas en comparación con las pendientes. Nos ayuda a visualizar la eficiencia en el proceso de aceptación de donaciones.</p>
                          )}
                          {selectedReport === 'donacionesEntregadas' && (
                            <p>Este gráfico de líneas muestra la tendencia de donaciones entregadas a lo largo del tiempo. Nos permite identificar patrones y picos en la actividad de entrega de donaciones.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          )}
        </>
      )}
    </div>
  )
}