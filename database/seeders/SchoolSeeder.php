<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $schools = [
            [
                'name' => 'Escuela Primaria Cuauhtémoc',
                'code' => 'CCT-001',
                'groups' => ['1° A Náhuatl', '2° B Náhuatl'],
            ],
            [
                'name' => 'Telesecundaria Xochicalli',
                'code' => 'CCT-002',
                'groups' => ['Grupo Virtual Otomí Básico', 'Grupo Presencial Otomí Avanzado'],
            ],
            [
                'name' => 'Centro Comunitario Maya Peninsular',
                'code' => 'CCT-003',
                'groups' => ['Grupo Maya Intensivo'],
            ],
        ];

        foreach ($schools as $data) {
            $school = School::updateOrCreate(
                ['code' => $data['code']],
                [
                    'name' => $data['name'],
                    'is_active' => true,
                ]
            );

            foreach ($data['groups'] as $groupName) {
                Group::updateOrCreate(
                    [
                        'school_id' => $school->id,
                        'name' => $groupName,
                    ]
                );
            }
        }
    }
}
