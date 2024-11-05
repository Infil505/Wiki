'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle2, Bell, Heart, Utensils, History, Settings, FileText, PieChart } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, LineChart, Line } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Donation {
  id: string
  name: string
  type: string
  quantity: number
  image: string
  status: 'pending' | 'accepted' | 'delivered'
  timestamp: number
}

interface Request {
  id: string
  beneficiaryName: string
  address: string
  needs: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: number
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
  timestamp: number
}

interface Notification {
  id: string
  type: 'system' | 'donation' | 'request'
  message: string
  timestamp: number
}

const ADMIN_CODE = "Administrador12345"
const DATA_RETENTION_PERIOD = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

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
  const [notifications, setNotifications] = useState<Notification[]>([])

  const loadDataFromLocalStorage = useCallback(() => {
    const loadedDonations = JSON.parse(localStorage.getItem('donations') || '[]')
    const loadedRequests = JSON.parse(localStorage.getItem('requests') || '[]')
    const loadedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const loadedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]')
    const loadedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')

    const now = Date.now()
    const cleanedDonations = loadedDonations.filter((d: Donation) => (now - d.timestamp) < DATA_RETENTION_PERIOD)
    const cleanedRequests = loadedRequests.filter((r: Request) => (now - r.timestamp) < DATA_RETENTION_PERIOD)
    const cleanedCampaigns = loadedCampaigns.filter((c: Campaign) => (now - c.timestamp) < DATA_RETENTION_PERIOD)
    const cleanedNotifications = loadedNotifications.filter((n: Notification) => (now - n.timestamp) < DATA_RETENTION_PERIOD)

    setDonations(cleanedDonations)
    setRequests(cleanedRequests)
    setUsers(loadedUsers)
    setCampaigns(cleanedCampaigns)
    setNotifications(cleanedNotifications)
  }, [])

  useEffect(() => {
    loadDataFromLocalStorage()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'donations' || e.key === 'requests' || e.key === 'notifications') {
        loadDataFromLocalStorage()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    const cleanupInterval = setInterval(() => {
      loadDataFromLocalStorage()
    }, 60 * 60 * 1000) // Run every hour

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(cleanupInterval)
    }
  }, [loadDataFromLocalStorage])

  const addNotification = useCallback((message: string, type: 'system' | 'donation' | 'request') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now()
    }
    setNotifications(prev => {
      const updated = [...prev, newNotification]
      localStorage.setItem('notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  const showNotificationMessage = useCallback((message: string, type: 'success' | 'error') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
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
      if (user.type === 'administrador') {
        addNotification('Nuevo inicio de sesión de administrador', 'system')
      }
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
    setUsers(prev => {
      const updated = [...prev, newUser]
      localStorage.setItem('users', JSON.stringify(updated))
      return updated
    })
    showNotificationMessage('Registro exitoso', 'success')
    setShowRegisterForm(false)
    if (type === 'administrador') {
      addNotification('Nuevo administrador registrado', 'system')
    }
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
      status: 'pending',
      timestamp: Date.now()
    }
    setDonations(prev => {
      const updated = [...prev, newDonation]
      localStorage.setItem('donations', JSON.stringify(updated))
      return updated
    })
    showNotificationMessage('Donación registrada con éxito', 'success')
    addNotification(`Nueva donación de ${newDonation.quantity} ${newDonation.type} por ${newDonation.name}`, 'donation')
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
      status: 'pending',
      timestamp: Date.now()
    }
    setRequests(prev => {
      const updated = [...prev, newRequest]
      localStorage.setItem('requests', JSON.stringify(updated))
      return updated
    })
    showNotificationMessage('Solicitud enviada con éxito', 'success')
    addNotification('Nueva solicitud de alimentos recibida', 'request')
    e.currentTarget.reset()
  }

  const handleEditDonation = (id: string) => {
    // Implement edit functionality
    console.log('Editing donation with id:', id)
  }

  const handleDeleteDonation = (id: string) => {
    setDonations(prev => {
      const updated = prev.filter(donation => donation.id !== id)
      localStorage.setItem('donations', JSON.stringify(updated))
      return updated
    })
    showNotificationMessage('Donación eliminada con éxito', 'success')
    addNotification('Donación eliminada', 'system')
  }

  const handleAddDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDonation: Donation = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('donationType') as string,
      quantity: Number(formData.get('quantity')),
      image: '/placeholder.svg', // You might want to handle image upload separately
      status: 'pending',
      timestamp: Date.now()
    }
    setDonations(prev => {
      const updated = [...prev, newDonation]
      localStorage.setItem('donations', JSON.stringify(updated))
      return updated
    })
    showNotificationMessage('Nueva donación agregada con éxito', 'success')
    addNotification('Nueva donación agregada manualmente', 'donation')
    setShowAddDonationForm(false)
    e.currentTarget.reset()
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
      current: 0,
      timestamp: Date.now()
    }
    setCampaigns(prev => {
      const updated = [...prev, newCampaign]
      localStorage.setItem('campaigns', JSON.stringify(updated))
      return updated
    })
    showNotificationMessage('Campaña creada con éxito', 'success')
    addNotification('Nueva campaña creada', 'system')
    e.currentTarget.reset()
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/img/Diseño sin título.png')" }}>
      <div className="absolute inset-0 filter blur-[10px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-100" />
      <div className="container mx-auto p-4 relative z-10">

        <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">Proyecto de Recolección de Alimentos</h1>

        {showNotification && (
          <div className={`fixed top-4 right-4 p-4 rounded-md ${notificationType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white shadow-lg transition-all duration-300 ease-in-out`}>
            {notificationType === 'success' ? <CheckCircle2 className="inline mr-2" /> : <AlertCircle className="inline mr-2" />}
            {notificationMessage}
          </div>
        )}

        {!isLoggedIn ? (
          <Card className="bg-white shadow-lg max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Acceso al Sistema</CardTitle>
              <CardDescription>Inicia sesión o regístrate para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              {!showRegisterForm ? (
                <form onSubmit={handleLogin}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Nombre de  Usuario</Label>
                      <Input id="username" name="username" placeholder="Tu nombre de usuario" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input id="password" name="password" type="password" placeholder="Tu contraseña" required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Iniciar Sesión</Button>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Nombre de  Usuario</Label>
                      <Input id="username" name="username" placeholder="Elige un nombre de usuario" required  />
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
                  <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Registrarse</Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="link" onClick={() => setShowRegisterForm(!showRegisterForm)} className="text-blue-600">
                {showRegisterForm ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <Button onClick={handleLogout} className="mb-4 bg-red-600 hover:bg-red-700 text-white transition-colors duration-200">Cerrar Sesión</Button>

            {userType === 'beneficiario' ? (
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">Solicitar Alimentos</CardTitle>
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
                    <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Enviar Solicitud</Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-blue-100 rounded-lg p-1">
                  <TabsTrigger value="inicio" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                    <Heart className="w-4 h-4 mr-2" />
                    Inicio
                  </TabsTrigger>
                  {userType === 'restaurante' && (
                    <>
                      <TabsTrigger value="donaciones" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                        <Utensils className="w-4 h-4 mr-2" />
                        Donar
                      </TabsTrigger>
                      <TabsTrigger value="historial" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                        <History className="w-4 h-4 mr-2" />
                        Historial
                      </TabsTrigger>
                    </>
                  )}
                  {userType === 'administrador' && (
                    <>
                      <TabsTrigger value="manageDonations" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                        <Settings className="w-4 h-4 mr-2" />
                        Gestionar Donaciones
                      </TabsTrigger>
                      <TabsTrigger value="manageRequests" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                        <FileText className="w-4 h-4 mr-2" />
                        Gestionar Solicitudes
                      </TabsTrigger>
                      <TabsTrigger value="campaigns" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                        <PieChart className="w-4 h-4 mr-2" />
                        Campañas
                      </TabsTrigger>
                      <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:text-blue-900 rounded-md transition-all duration-200">
                        <BarChart className="w-4 h-4 mr-2" />
                        Reportes
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>

                <TabsContent value="inicio">
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-blue-900">Bienvenido al Proyecto de Recolección de Alimentos</CardTitle>
                      <CardDescription>Juntos podemos hacer la diferencia</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">Este proyecto conecta restaurantes y personas dispuestas a donar alimentos con aquellos que lo necesitan. Contamos con un equipo dedicado de colaboradores que gestiona todo el proceso de recolección y distribución.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                {userType === 'restaurante' && (
                  <>
                    <TabsContent value="donaciones">
                      <Card className="bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-900">Donar Alimentos</CardTitle>
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
                            <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Registrar Donación</Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="historial">
                      <Card className="bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-900">Historial de Donaciones</CardTitle>
                          <CardDescription>Registro de tus donaciones anteriores</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {donations.length > 0 ? (
                            <div className="space-y-4">
                              {donations.map((donation) => (
                                <div key={donation.id} className="border-b border-gray-200 pb-4">
                                  <h3 className="text-lg font-semibold text-blue-900">{donation.name}</h3>
                                  <p className="text-gray-600">{donation.type} - Cantidad: {donation.quantity}</p>
                                  <p className="text-gray-600">Estado: <span className="font-medium">{donation.status}</span></p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">No hay donaciones registradas.</p>
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
                          <CardTitle className="text-2xl text-blue-900">Gestionar Donaciones</CardTitle>
                          <CardDescription>Lista de donaciones registradas</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {donations.length > 0 ? (
                            <div className="space-y-4">
                              {donations.map((donation) => (
                                <div key={donation.id} className="border-b border-gray-200 pb-4 flex justify-between items-center">
                                  <div className="flex items-center space-x-4">
                                    <Avatar>
                                      <AvatarImage src={donation.image} alt={`Imagen de ${donation.name}`} />
                                      <AvatarFallback>Sin Imagen</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-lg font-semibold text-blue-900">{donation.name}</h3>
                                      <p className="text-gray-600">{donation.type} - Cantidad: {donation.quantity}</p>
                                      <p className="text-gray-600">Estado: <span className="font-medium">{donation.status}</span></p>
                                    </div>
                                  </div>
                                  <div className="space-x-2">
                                    <Button variant="outline" onClick={() => handleEditDonation(donation.id)}>Editar</Button>
                                    <Button variant="destructive" onClick={() => handleDeleteDonation(donation.id)}>Eliminar</Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">No hay donaciones registradas.</p>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => setShowAddDonationForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Agregar Donación</Button>
                        </CardFooter>
                      </Card>
                      {showAddDonationForm && (
                        <Card className="mt-4 bg-white shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-xl text-blue-900">Agregar Nueva Donación</CardTitle>
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
                              </div>
                              <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Guardar Donación</Button>
                            </form>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="manageRequests">
                      <Card className="bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-900">Gestionar Solicitudes</CardTitle>
                          <CardDescription>Lista de solicitudes recibidas</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {requests.length > 0 ? (
                            <div className="space-y-4">
                              {requests.map((request) => (
                                <div key={request.id} className="border-b border-gray-200 pb-4">
                                  <h3 className="text-lg font-semibold text-blue-900">{request.beneficiaryName}</h3>
                                  <p className="text-gray-600">{request.address}</p>
                                  <p className="text-gray-600">Necesidades: {request.needs}</p>
                                  <p className="text-gray-600">Estado: <span className="font-medium">{request.status}</span></p>
                                  <div className="mt-2 space-x-2">
                                    <Button variant="outline" onClick={() => console.log('Aprobar solicitud', request.id)}>Aprobar</Button>
                                    <Button variant="destructive" onClick={() => console.log('Rechazar solicitud', request.id)}>Rechazar</Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">No hay solicitudes registradas.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="campaigns">
                      <Card className="bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-900">Campañas</CardTitle>
                          <CardDescription>Gestión de campañas de donación</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {campaigns.map((campaign) => (
                            <div key={campaign.id} className="border-b border-gray-200 pb-4 mb-4">
                              <h3 className="text-lg font-semibold text-blue-900">{campaign.name}</h3>
                              <p className="text-gray-600">{campaign.description}</p>
                              <p className="text-gray-600">Fecha: {campaign.startDate} - {campaign.endDate}</p>
                              <p className="text-gray-600">Progreso: {campaign.current} / {campaign.goal}</p>
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
                            <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">Crear Nueva Campaña</Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="reports">
                      <Card className="bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-900">Reportes</CardTitle>
                          <CardDescription>Generación y visualización de reportes</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex space-x-4 mb-4">
                            <Button variant="outline" onClick={() => setSelectedReport('campanas')} className={selectedReport === 'campanas' ? 'bg-blue-100' : ''}>Campañas</Button>
                            <Button variant="outline" onClick={() => setSelectedReport('donacionesAceptadas')} className={selectedReport === 'donacionesAceptadas' ? 'bg-blue-100' : ''}>Donaciones Aceptadas</Button>
                            <Button variant="outline" onClick={() => setSelectedReport('donacionesEntregadas')} className={selectedReport === 'donacionesEntregadas' ? 'bg-blue-100' : ''}>Donaciones Entregadas</Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 h-64 w-full">
                            {/* Primer gráfico - Datos de campaña actual */}
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={[
                                { name: 'Campaña 1', current: 150 },
                                { name: 'Campaña 2', current: 200 },
                                { name: 'Campaña 3', current: 180 },
                                { name: 'Campaña 4', current: 120 }
                              ]}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="current" fill="#3B82F6" />
                              </BarChart>
                            </ResponsiveContainer>

                            {/* Segundo gráfico - Cambia según la selección */}
                            <ResponsiveContainer width="100%" height="100%">
                              {selectedReport === 'campanas' ? (
                                <RePieChart>
                                  <Pie 
                                    dataKey="value" 
                                    data={[
                                      { name: 'Aceptadas', value: donations.filter(d => d.status === 'accepted').length },
                                      { name: 'Pendientes', value: donations.filter(d => d.status === 'pending').length },
                                    ]} 
                                    fill="#3B82F6" 
                                    label 
                                  />
                                  <Tooltip />
                                </RePieChart>
                              ) : selectedReport === 'donacionesAceptadas' ? (
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
                                  <Line type="monotone" dataKey="value" stroke="#3B82F6" />
                                </LineChart>
                              ) : (
                                <BarChart data={[
                                  { name: 'Ene', value: 400 },
                                  { name: 'Feb', value: 300 },
                                  { name: 'Mar', value: 200 },
                                  { name: 'Abr', value: 278 },
                                  { name: 'May', value: 189 },
                                ]}>
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#3B82F6" />
                                </BarChart>
                              )}
                            </ResponsiveContainer>
                          </div>
                          <div className="mt-4 text-gray-600">
                            {selectedReport === 'campanas' && (
                              <p>Los gráficos muestran el progreso de las campañas activas y la distribución de donaciones aceptadas vs pendientes.</p>
                            )}
                            {selectedReport === 'donacionesAceptadas' && (
                              <p>Los gráficos muestran el estado actual de las campañas y la tendencia de donaciones aceptadas en el tiempo.</p>
                            )}
                            {selectedReport === 'donacionesEntregadas' && (
                              <p>Los gráficos muestran el progreso de las campañas y la tendencia de donaciones entregadas a lo largo del tiempo.</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                      <Card className="bg-white shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-900">Notificaciones</CardTitle>
                          <CardDescription>Últimas actividades en el sistema</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue="all">
                            <TabsList>
                              <TabsTrigger value="all">Todas</TabsTrigger>
                              <TabsTrigger value="system">Sistema</TabsTrigger>
                              <TabsTrigger value="donation">Donaciones</TabsTrigger>
                              <TabsTrigger value="request">Solicitudes</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                              <NotificationList notifications={notifications} />
                            </TabsContent>
                            <TabsContent value="system">
                              <NotificationList notifications={notifications.filter(n => n.type === 'system')} />
                            </TabsContent>
                            <TabsContent value="donation">
                              <NotificationList notifications={notifications.filter(n => n.type === 'donation')} />
                            </TabsContent>
                            <TabsContent value="request">
                              <NotificationList notifications={notifications.filter(n => n.type === 'request')} />
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </>
                )}
              </Tabs>
            )}
          </>
        )}

        {isLoggedIn && userType === 'administrador' && (
          <div className="fixed bottom-4 right-4">
            <Button onClick={() => setActiveTab('notifications')} className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
              <Bell className="mr-2" />
              Notificaciones ({notifications.length})
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function NotificationList({ notifications }: { notifications: Notification[] }) {
  return (
    <div className="space-y-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="border-b border-gray-200 pb-4">
            <p className="text-gray-700">{notification.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay notificaciones nuevas.</p>
      )}
    </div>
  )
}