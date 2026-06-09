<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
// Si tienes base de datos usa: use App\Models\Story;
// Si no, no importa, este controlador funcionará igual con los datos locales del Frontend.

class StoryController extends Controller
{
    public function index()
    {
        // Retornamos la vista directamente.
        // Los cuentos están definidos en el archivo Index.jsx (Frontend), 
        // así que no necesitamos enviarlos desde aquí por ahora si usas los archivos locales.
        return Inertia::render('Cuentos/Index');
    }
}