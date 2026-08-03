<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Muestra el panel de administración
     */
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }
}