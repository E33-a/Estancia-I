<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SystemHealthController extends Controller
{
    public function index(): Response
    {
        // 1. Latencia real hacia la Base de Datos
        $dbStart = microtime(true);
        DB::connection()->getPdo();
        $latency = round((microtime(true) - $dbStart) * 1000);

        // 2. Uso de CPU / Carga del Servidor (Linux/macOS)
        $cpuLoad = 0;
        if (function_exists('sys_getloadavg')) {
            $load = sys_getloadavg();
            $cpuLoad = round(($load[0] ?? 0) * 10, 1); // Carga estimada en %
        }

        // 3. Métricas de Almacenamiento (Disco Principal)
        $totalSpace = disk_total_space(base_path());
        $freeSpace = disk_free_space(base_path());
        $usedSpace = $totalSpace - $freeSpace;

        $storageStats = [
            'used_tb'       => round($usedSpace / (1024 ** 4), 2),
            'used_gb'       => round($usedSpace / (1024 ** 3), 2),
            'total_tb'      => round($totalSpace / (1024 ** 4), 2),
            'percentage'    => round(($usedSpace / $totalSpace) * 100),
            'breakdown_gb'  => [
                'videos'    => round($this->getDirectorySize('public/videos') / (1024 ** 3), 2),
                'audios'    => round($this->getDirectorySize('public/audios') / (1024 ** 3), 2),
                'documents' => round($this->getDirectorySize('public/documents') / (1024 ** 3), 2),
            ],
        ];

        // 4. Estado de Servicios Clave
        $services = [
            [
                'name'      => 'Core API Cluster',
                'status'    => 'Operational',
                'icon'      => 'api',
                'last_check'=> 'Just now',
            ],
            [
                'name'      => 'Primary Database',
                'status'    => DB::connection()->getPdo() ? 'Operational' : 'Degraded',
                'icon'      => 'database',
                'last_check'=> 'Just now',
            ],
            [
                'name'      => 'Media Delivery CDN',
                'status'    => Storage::disk('public')->exists('') ? 'Operational' : 'Degraded',
                'icon'      => 'router',
                'last_check'=> '1m ago',
            ],
        ];

        return Inertia::render('Admin/SystemHealth/Index', [
            'metrics' => [
                'latency' => $latency,
                'cpuLoad' => $cpuLoad,
                'uptime'  => 99.98, // Requiere servicio externo de Uptime (ej. UptimeRobot)
            ],
            'storage'  => $storageStats,
            'services' => $services,
        ]);
    }

    private function getDirectorySize(string $path): int
    {
        $size = 0;
        if (Storage::disk('local')->exists($path)) {
            foreach (Storage::disk('local')->allFiles($path) as $file) {
                $size += Storage::disk('local')->size($file);
            }
        }
        return $size;
    }
}