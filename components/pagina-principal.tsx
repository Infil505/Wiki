"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line } from 'recharts';


interface Donation {
  name: string;
  type: string;
  quantity: number; // Asumiendo que quantity es un número
  image: string; // URL de la imagen
}


type Request = {
  beneficiaryName: string;
  address: string;
  needs: string;
};

export default function FoodCollectionApp() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [selectedReport, setSelectedReport] = useState('campanas');
  const [showAddDonationForm, setShowAddDonationForm] = useState(false);
  const [userType, setUserType] = useState<'administrador' | 'beneficiario' | 'restaurante' | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  const handleLogin = (type: 'administrador' | 'beneficiario' | 'restaurante') => {
    setIsLoggedIn(true);
    setUserType(type); // Esto debería funcionar si userType está bien definido
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setActiveTab("inicio");
  };

  const handleDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Verifica que el valor de 'image' no sea null y sea un archivo
    const imageFile = formData.get('image') as File | null;
    const newDonation: Donation = {
      name: formData.get('name') as string,
      type: formData.get('donationType') as string,
      quantity: formData.get('quantity') !== null ? Number(formData.get('quantity')) :  0,
      image: imageFile ? URL.createObjectURL(imageFile) : '', // Manejo de imagen
    };

    setDonations([...donations, newDonation]);
    showNotificationMessage('Donación registrada con éxito', 'success');
    e.currentTarget.reset(); // Resetea el formulario
  };

  const handleRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRequest = {
      beneficiaryName: formData.get('beneficiaryName') as string,
      address: formData.get('address') as string,
      needs: formData.get('needs') as string
    };
    setRequests([...requests, newRequest]);
    showNotificationMessage('Solicitud enviada con éxito', 'success');
    e.currentTarget.reset();
  };

  const showNotificationMessage = (message: string, type: 'success' | 'error') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  

  const handleEditDonation = (index: number) => {
    // Implement edit functionality
    console.log('Editing donation at index:', index);
  };

  const handleDeleteDonation = (index: number) => {
    setDonations(donations.filter((_, i) => i !== index));
  };

  const handleAddDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement add functionality
    console.log('Adding new donation');
    setShowAddDonationForm(false);
  };

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
            <CardTitle className="text-2xl text-green-700">Iniciar Sesión</CardTitle>
            <CardDescription>Selecciona tu tipo de usuario</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-x-4">
            <Button onClick={() => handleLogin('administrador')} className="bg-blue-500 hover:bg-blue-600">Administrador</Button>
            <Button onClick={() => handleLogin('restaurante')} className="bg-green-500 hover:bg-green-600">Restaurante</Button>
            <Button onClick={() => handleLogin('beneficiario')} className="bg-yellow-500 hover:bg-yellow-600">Beneficiario</Button>
          </CardContent>
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
                <TabsContent value="donors">
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
                            <Input id="quantity" name="quantity" placeholder="Cantidad aproximada" required />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="image">Imagen del Producto</Label>
                            <Input id="image" name="image" type="file" required />
                          </div>
                        </div>
                        <Button type="submit" className="mt-4 bg-green-500 hover:bg-green-600">Registrar Donación</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

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
                              <Input id="quantity" name="quantity" placeholder="Cantidad aproximada" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="image">Imagen del Producto</Label>
                              <Input id="image" name="image" type="file" required />
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
                          donations.map((donation, index) => (
                            <div key={index} className="border-b border-gray-300 p-4">
                              <h3 className="text-lg font-semibold">{donation.name}</h3>
                              <p>{donation.type} - Cantidad: {donation.quantity}</p>
                              <p>Estado: Entregada</p>
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
                          donations.map((donation, index) => (
                            <div key={index} className="border-b border-gray-300 p-4 flex justify-between items-center">
                              <div>
                                <Avatar>
                                  <AvatarImage src={donation.image} alt={`Imagen de ${donation.name}`} />
                                  <AvatarFallback>Sin Imagen</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-semibold">{donation.name}</h3>
                                <p>{donation.type} - Cantidad: {donation.quantity}</p>
                              </div>
                              <div>
                                <Button variant="outline" className="mr-2" onClick={() => handleEditDonation(index)}>Editar</Button>
                                <Button variant="destructive" onClick={() => handleDeleteDonation(index)}>Eliminar</Button>
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
                            {/* Add donation form fields here */}
                            <Button type="submit">Guardar Donación</Button>
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
                          requests.map((request, index) => (
                            <div key={index} className="border-b border-gray-300 p-4">
                              <h3 className="text-lg font-semibold">{request.beneficiaryName}</h3>
                              <p>{request.address} - Necesidades: {request.needs}</p>
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
                        <p>Aquí se mostrarán las campañas activas y la opción de crear nuevas.</p>
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
                              <BarChart data={[
                                { name: 'Campaña 1', value: 400 },
                                { name: 'Campaña 2', value: 300 },
                                { name: 'Campaña 3', value: 200 },
                                { name: 'Campaña 4', value: 278 },
                                { name: 'Campaña 5', value: 189 },
                              ]}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                              </BarChart>
                            ) : selectedReport === 'donacionesAceptadas' ? (
                              <PieChart>
                                <Pie dataKey="value" data={[
                                  { name: 'Aceptadas', value: 400 },
                                  { name: 'Pendientes', value: 300 },
                                ]} fill="#8884d8" label />
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
  );
}
