<?php

namespace Database\Seeders;

use App\Models\Story;
use App\Models\StoryChapter;
use Illuminate\Database\Seeder;

class StorySeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | 1. El Conejo en la Luna
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'el-conejo-en-la-luna',
                'title' => 'El Conejo en la Luna',
                'description' =>
                    'Un pequeño conejo descubre que un acto de generosidad puede dejar una huella más grande que él mismo.',
                'language' => 'Náhuatl',
                'category' => 'Mitos',
                'level' => 'Básico',
                'duration' => 7,
                'cover_emoji' => '🐇🌙',
                'image_url' => null,
                'is_featured' => false,
                'published' => true,
            ],
            [
                [
                    'title' => 'El encuentro',
                    'spanish_text' =>
                        'Una noche, un caminante avanzaba por el campo bajo la luz de la luna. Había recorrido un largo camino y estaba cansado. Cerca de un maguey apareció un pequeño conejo que lo observó con curiosidad.',
                    'target_text' =>
                        'Niman tochtli quihto: —Nican nica. —Amo tiquitlaqua? —Nimitzitlaquaz.',
                    'target_text' =>
    'Ce yohualli, ce nenqui nemiya ipan tlalli itlan metztli. Cenca ciyahui. Itech metl monexti ce piltontli tochtli, ihuan quitta ica mahuiztilistli.',
                    'vocabulary' => [
                        [
                            'target' => 'Tochtli',
                            'spanish' => 'Conejo',
                        ],
                        [
                            'target' => 'Metztli',
                            'spanish' => 'Luna',
                        ],
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                    ],
                ],
                [
                    'title' => 'Una pequeña ofrenda',
                    'spanish_text' =>
                        'El conejo notó que el viajero tenía hambre. Aunque no poseía comida para compartir, quiso ayudarlo. Le ofreció las hierbas que conocía y permaneció a su lado para que no estuviera solo.',
                    'target_text' =>
                    'In tochtli quittac in nenqui mayana. Amo quipiaya tlacualli, zan quimacac xihuitl ihuan mocauh inahuac. Quinequia quipalehuiz ihuan amo icel mocahuaz.',
                    'vocabulary' => [
                        [
                            'target' => 'Tochtli',
                            'spanish' => 'Conejo',
                        ],
                        [
                            'target' => 'Cuahuitl',
                            'spanish' => 'Árbol',
                        ],
                    ],
                ],
                [
                    'title' => 'El reflejo',
                    'spanish_text' =>
                        'El viajero agradeció la generosidad del pequeño animal. Al mirar hacia el cielo vio la luna brillante y pensó que las buenas acciones merecían ser recordadas.',
                    'target_text' =>
    'In nenqui tlazohcamati. Ajco tlachix ihuan quittac in metztli papatlaca ilhuicac. Quielnamic in cualli iyollo in tochtli ihuan quimomati ca cualli tlamantli monequi quielnamiquiz.',
                    'vocabulary' => [
                        [
                            'target' => 'Metztli',
                            'spanish' => 'Luna',
                        ],
                        [
                            'target' => 'Tonatiuh',
                            'spanish' => 'Sol',
                        ],
                    ],
                ],
                [
                    'title' => 'Una memoria en el cielo',
                    'spanish_text' =>
                        'Desde aquella noche, quienes observan la luna imaginan la figura de un conejo sobre su superficie. La historia recuerda que incluso alguien pequeño puede realizar un acto enorme de generosidad.',
                    'target_text' =>
    'Axcan, in aquin quitta metztli huel quielnamiqui in tochtli. Inon tlahtolli techmachtia ca ce piltontli no huel quichihua ce hueyi cualli tlamantli.',
                    'vocabulary' => [
                        [
                            'target' => 'Tochtli',
                            'spanish' => 'Conejo',
                        ],
                        [
                            'target' => 'Metztli',
                            'spanish' => 'Luna',
                        ],
                    ],
                ],
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 2. El Jardín del Cempasúchil
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'el-jardin-del-cempasuchil',
                'title' => 'El Jardín del Cempasúchil',
                'description' =>
                    'Una niña aprende que cuidar una pequeña flor también significa cuidar la memoria de su familia.',
                'language' => 'Náhuatl',
                'category' => 'Leyendas',
                'level' => 'Intermedio',
                'duration' => 8,
                'cover_emoji' => '🌼☀️',
                'image_url' => null,
                'is_featured' => false,
                'published' => true,
            ],
            [
                [
                    'title' => 'La primera semilla',
                    'spanish_text' =>
                        'Citlali recibió de su abuela unas pequeñas semillas. Le pidió sembrarlas cerca de la casa y cuidar la tierra todos los días, incluso cuando pareciera que nada estaba cambiando.',
                    'target_text' =>
    'Citlali quiselili cequintin xinachtli itech icihtzin. Quitocac inahuac calli ihuan mochipa quimocuitlahui in tlalli, macihui ayamo monextia xochitl.',
                    'vocabulary' => [
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                    ],
                ],
                [
                    'title' => 'Agua y paciencia',
                    'spanish_text' =>
                        'Cada mañana, Citlali llevaba agua al jardín. Durante varios días solo vio tierra húmeda, pero continuó cuidándola hasta que aparecieron los primeros brotes verdes.',
                    'target_text' =>
    'Mochipa ica tlaneztli Citlali quihuicaya atl xochitla. Quimocuitlahui in tlalli miac tonalli, ihuan niman monextiqueh in xoxouhqui izhuatl.',
                    'vocabulary' => [
                        [
                            'target' => 'Atl',
                            'spanish' => 'Agua',
                        ],
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                    ],
                ],
                [
                    'title' => 'Las flores del sol',
                    'spanish_text' =>
                        'Con el paso de las semanas aparecieron flores intensamente anaranjadas. Bajo la luz del sol, el jardín parecía encenderse y toda la familia se reunió para contemplarlo.',
                    'target_text' =>
    'Ipan cequin tonalli monextiqueh miac cualli xochimeh. Tonatiuh quintlahuiliaya ihuan in calli chanequeh mocentlalijkeh quimitazqueh.',
                    'vocabulary' => [
                        [
                            'target' => 'Xochitl',
                            'spanish' => 'Flor',
                        ],
                        [
                            'target' => 'Tonatiuh',
                            'spanish' => 'Sol',
                        ],
                    ],
                ],
                [
                    'title' => 'El jardín de la memoria',
                    'spanish_text' =>
                        'La abuela explicó que cada flor podía ayudarlos a recordar historias y personas importantes. Citlali comprendió que cuidar el jardín también era una manera de conservar la memoria familiar.',
                    'target_text' =>
    'Icihtzin quilhuia Citlali ca in xochitl techilnamiquiltia in tohuehuehtlahtol. Citlali quimomati ca quimocuitlahuia in xochitla ihuan nozo in icalpulli ilnamiquiliz.',
                    'vocabulary' => [
                        [
                            'target' => 'Xochitl',
                            'spanish' => 'Flor',
                        ],
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                    ],
                ],
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 3. El Canto del Cenzontle
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'el-canto-del-cenzontle',
                'title' => 'El Canto del Cenzontle',
                'description' =>
                    'Un pequeño pájaro descubre que no necesita imitar a los demás para encontrar su propia voz.',
                'language' => 'Náhuatl',
                'category' => 'Naturaleza',
                'level' => 'Básico',
                'duration' => 6,
                'cover_emoji' => '🐦🌳',
                'image_url' => null,
                'is_featured' => false,
                'published' => true,
            ],
            [
                [
                    'title' => 'Muchas voces',
                    'spanish_text' =>
                        'En un bosque lleno de árboles vivía un pequeño pájaro que escuchaba con atención todos los sonidos a su alrededor. Cada mañana intentaba repetir lo que escuchaba.',
                    'target_text' =>
    'Ipan cuauhtla nemiya ce piltontli tototl. Quicaqui miac tlahtolli ihuan cuicatl. Mochipa quinequia cuicaz quen in occequin totomeh.',
                    'vocabulary' => [
                        [
                            'target' => 'Tototl',
                            'spanish' => 'Pájaro',
                        ],
                        [
                            'target' => 'Cuahuitl',
                            'spanish' => 'Árbol',
                        ],
                    ],
                ],
                [
                    'title' => 'La búsqueda',
                    'spanish_text' =>
                        'El pájaro voló de árbol en árbol escuchando al viento, a otros animales y al agua. Quería descubrir cuál de todos aquellos sonidos era el suyo.',
                    'target_text' =>
    'In tototl patlani ipan ce cuahuitl ihuan occe cuahuitl. Quicaqui ehecatl, atl ihuan occequin yolcameh. Quitemoa ixcuic ihuan itlahtol.',
                    'vocabulary' => [
                        [
                            'target' => 'Tototl',
                            'spanish' => 'Pájaro',
                        ],
                        [
                            'target' => 'Atl',
                            'spanish' => 'Agua',
                        ],
                    ],
                ],
                [
                    'title' => 'Su propia canción',
                    'spanish_text' =>
                        'Una mañana dejó de intentar copiar a los demás y comenzó a cantar libremente. Su canción mezcló todo lo que había escuchado durante su viaje.',
                    'target_text' =>
    'Ce tlaneztli ayoc quinecqui quixiptlaz occequin totomeh. Peuh cuica ica iyollo, ihuan icuic monechico ica moch tlen oquicac ipan iohtli.',
                    'vocabulary' => [
                        [
                            'target' => 'Tonatiuh',
                            'spanish' => 'Sol',
                        ],
                        [
                            'target' => 'Tototl',
                            'spanish' => 'Pájaro',
                        ],
                    ],
                ],
                [
                    'title' => 'El bosque escucha',
                    'spanish_text' =>
                        'Los animales guardaron silencio para escuchar. El pequeño pájaro comprendió que aprender de otros no significaba perder su propia voz.',
                    'target_text' =>
    'In yolcameh mocahuah ica quicaquizqueh in tototl. In piltontli tototl quimomati ca huel momachtia itech occequin, ihuan nozo quipia ixcuic.',
                    'vocabulary' => [
                        [
                            'target' => 'Cuahuitl',
                            'spanish' => 'Árbol',
                        ],
                        [
                            'target' => 'Tototl',
                            'spanish' => 'Pájaro',
                        ],
                    ],
                ],
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 4. Los Guardianes del Bosque
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'los-guardianes-del-bosque',
                'title' => 'Los Guardianes del Bosque',
                'description' =>
                    'Dos hermanos descubren que proteger la naturaleza empieza con pequeñas decisiones.',
                'language' => 'Náhuatl',
                'category' => 'Naturaleza',
                'level' => 'Avanzado',
                'duration' => 10,
                'cover_emoji' => '🌳🦌',
                'image_url' => null,
                'is_featured' => false,
                'published' => true,
            ],
            [
                [
                    'title' => 'El camino',
                    'spanish_text' =>
                        'Dos hermanos subieron hacia un bosque que comenzaba al pie del cerro. Su abuelo les había enseñado a caminar con cuidado y a observar las huellas sin molestar a los animales.',
                    'target_text' =>
    'Ome icnihuan yajqueh cuauhtla itzintlan tepetl. In huehueh quintlamachtia ma cualli nenemican ihuan ma amo quincuepachocan in yolcameh.',
                    'vocabulary' => [
                        [
                            'target' => 'Tepetl',
                            'spanish' => 'Cerro',
                        ],
                        [
                            'target' => 'Cuahuitl',
                            'spanish' => 'Árbol',
                        ],
                    ],
                ],
                [
                    'title' => 'Las huellas',
                    'spanish_text' =>
                        'Junto a un arroyo encontraron huellas de venado. En lugar de seguirlas, decidieron mantener distancia para no asustar al animal.',
                    'target_text' =>
    'Itech atl quittaqueh in icxitlan mazatl. Amo quitoquilijkeh, pampa amo quinequeh quimomauhtizqueh in yolcatl. Zan hueca quittaqueh.',
                    'vocabulary' => [
                        [
                            'target' => 'Mazatl',
                            'spanish' => 'Venado',
                        ],
                        [
                            'target' => 'Atl',
                            'spanish' => 'Agua',
                        ],
                    ],
                ],
                [
                    'title' => 'El árbol caído',
                    'spanish_text' =>
                        'Más adelante encontraron basura junto a un árbol caído. La recogieron y comprendieron que cuidar el bosque también significaba hacerse responsables de aquello que otros habían dejado.',
                    'target_text' =>
    'Quittaqueh tlazolli itech ce huetzqui cuahuitl. Quinechicoqueh in tlazolli ihuan quimomatiqueh ca monequi quimocuitlahuiah in cuauhtla.',
                    'vocabulary' => [
                        [
                            'target' => 'Cuahuitl',
                            'spanish' => 'Árbol',
                        ],
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                    ],
                ],
                [
                    'title' => 'Guardianes',
                    'spanish_text' =>
                        'Al regresar a casa contaron lo ocurrido. Desde entonces entendieron que un guardián del bosque no necesita poderes especiales: necesita respeto, atención y voluntad de cuidar.',
                    'target_text' =>
    'Mocuepqueh calli ihuan quitohqueh tlen opanoc. Quimomatiqueh ca in cuauhtla tlapiyani amo quipia mahuiztic chicahualistli; quipia tlazohtlalistli, tlachialistli ihuan cualli tequitl.',
                    'vocabulary' => [
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                        [
                            'target' => 'Tepetl',
                            'spanish' => 'Cerro',
                        ],
                    ],
                ],
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 5. El Secreto del Maíz
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'el-secreto-del-maiz',
                'title' => 'El Secreto del Maíz',
                'description' =>
                    'Una familia comparte con un niño el valor del trabajo colectivo alrededor de la cosecha.',
                'language' => 'Náhuatl',
                'category' => 'Vida Diaria',
                'level' => 'Básico',
                'duration' => 7,
                'cover_emoji' => '🌽🏡',
                'image_url' => null,
                'is_featured' => false,
                'published' => true,
            ],
            [
                [
                    'title' => 'La parcela',
                    'spanish_text' =>
                        'Mateo acompañó a su familia hasta la parcela. Pensaba que el maíz simplemente aparecía después de sembrar, pero ese día descubrió cuánto trabajo existía antes de la cosecha.',
                    'target_text' =>
    'Mateo yajqui milpan ihuan icalpulli. Oquimolhuiaya ca tlaolli zan moscalia, auh ipan inon tonalli quittac ca monequi miac tequitl achto in pixca.',
                    'vocabulary' => [
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                        [
                            'target' => 'Tonatiuh',
                            'spanish' => 'Sol',
                        ],
                    ],
                ],
                [
                    'title' => 'Cuidar',
                    'spanish_text' =>
                        'Cada persona tenía una tarea. Algunos revisaban la tierra, otros llevaban agua y otros retiraban hierbas para permitir que las plantas crecieran.',
                    'target_text' =>
    'Cece tlacatl quichihua ce tequitl. Cequintin quimocuitlahuiah tlalli, cequintin quihuicah atl, ihuan occequin quiquixtiah xihuitl. Ica inon cualli moscalia in tlaolli.',
                    'vocabulary' => [
                        [
                            'target' => 'Atl',
                            'spanish' => 'Agua',
                        ],
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                    ],
                ],
                [
                    'title' => 'La cosecha',
                    'spanish_text' =>
                        'Cuando llegó el momento de cosechar, Mateo comprendió que ninguna mazorca era resultado del esfuerzo de una sola persona. Todos habían participado.',
                    'target_text' =>
    'Ihcuac acic in pixca, Mateo quimomati ca amo ce tlacatl zan quichihua moch tequitl. Mochi tlacameh tequitih ihuan san secnequi quinechicoah in centli.',
                    'vocabulary' => [
                        [
                            'target' => 'Tonatiuh',
                            'spanish' => 'Sol',
                        ],
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                    ],
                ],
                [
                    'title' => 'Compartir',
                    'spanish_text' =>
                        'Esa noche la familia compartió la comida. Mateo descubrió que el verdadero secreto no estaba escondido dentro del maíz, sino en trabajar y compartir juntos.',
                    'target_text' =>
    'Inon yohualli in calli chanequeh quixexelohqueh tlaqualli. Mateo quimomati ca in tlaolli amo zan tlacualli; nozo technechicoa ipan tequitl ihuan tlamacalistli.',
                    'vocabulary' => [
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                        [
                            'target' => 'Tletl',
                            'spanish' => 'Fuego',
                        ],
                    ],
                ],
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 6. El Jaguar y las Estrellas
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'el-jaguar-y-las-estrellas',
                'title' => 'El Jaguar y las Estrellas',
                'description' =>
                    'Un joven jaguar aprende que la oscuridad también puede mostrar caminos que durante el día permanecen ocultos.',
                'language' => 'Náhuatl',
                'category' => 'Mitos',
                'level' => 'Intermedio',
                'duration' => 8,
                'cover_emoji' => '🐆✨',
                'image_url' => null,
                'is_featured' => false,
                'published' => true,
            ],
            [
                [
                    'title' => 'La noche',
                    'spanish_text' =>
                        'Cuando cayó la noche, un joven jaguar salió por primera vez sin compañía. Los sonidos del bosque parecían más fuertes y cada sombra parecía esconder algo desconocido.',
                    'target_text' =>
    'Ihcuac yohuac, ce telpochtli ocelotl quis cuauhtla icel. In tlahtolli ipan cuauhtla cenca chicahuac, ihuan cece ecahuil quimomauhtiaya.',
                    'vocabulary' => [
                        [
                            'target' => 'Ocelotl',
                            'spanish' => 'Jaguar',
                        ],
                        [
                            'target' => 'Cuahuitl',
                            'spanish' => 'Árbol',
                        ],
                    ],
                ],
                [
                    'title' => 'La luna',
                    'spanish_text' =>
                        'El jaguar levantó la mirada y encontró la luna sobre los árboles. Su luz no iluminaba todo el camino, pero era suficiente para continuar avanzando.',
                    'target_text' =>
    'In ocelotl ajco tlachix ihuan quittac metztli ipan cuahuitl. In metztli amo quitlahuiliaya moch ohtli, zan achi; auh inon tlanextli huel quipalehui ma oc nenemi.',
                    'vocabulary' => [
                        [
                            'target' => 'Ocelotl',
                            'spanish' => 'Jaguar',
                        ],
                        [
                            'target' => 'Metztli',
                            'spanish' => 'Luna',
                        ],
                    ],
                ],
                [
                    'title' => 'La montaña',
                    'spanish_text' =>
                        'Desde lo alto de un cerro observó cientos de luces en el cielo. Entonces comprendió que la noche no estaba vacía: estaba llena de señales que nunca había podido ver durante el día.',
                    'target_text' =>
    'Ipan icpac tepetl quittac miac citlalin ipan ilhuicatl. Quimomati ca in yohualli amo cactoc; tentoc ica tlanextli tlen amo huel quitta ipan tonalli.',
                    'vocabulary' => [
                        [
                            'target' => 'Tepetl',
                            'spanish' => 'Cerro',
                        ],
                        [
                            'target' => 'Metztli',
                            'spanish' => 'Luna',
                        ],
                    ],
                ],
                [
                    'title' => 'Un nuevo camino',
                    'spanish_text' =>
                        'El jaguar regresó al bosque sin miedo. Había aprendido que no siempre necesitamos ver todo el camino para continuar; a veces basta con reconocer la siguiente señal.',
                    'target_text' =>
    'In ocelotl mocuep cuauhtla ayoc cenca momauhtia. Quimomati ca amo mochipa monequi quitta moch ohtli; huel quitta in tlen icpan oc nenemiz.',
                    'vocabulary' => [
                        [
                            'target' => 'Ocelotl',
                            'spanish' => 'Jaguar',
                        ],
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                    ],
                ],
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 7. El Viaje de Mixcóatl
        |--------------------------------------------------------------------------
        */

        $this->createStory(
            [
                'slug' => 'el-viaje-de-mixcoatl',
                'title' => 'El Viaje de Mixcóatl',
                'description' =>
                    'Un viajero cruza montañas, bosques y ríos siguiendo las señales de la naturaleza para regresar a su comunidad.',
                'language' => 'Náhuatl',
                'category' => 'Leyendas',
                'level' => 'Intermedio',
                'duration' => 9,
                'cover_emoji' => '⛰️🔥',
                'image_url' => null,
                'is_featured' => true,
                'published' => true,
            ],
            [
                [
                    'title' => 'La partida',
                    'spanish_text' =>
                        'Mixcóatl salió de casa antes del amanecer. Su camino lo llevaría más allá del cerro que podía ver desde su comunidad. Llevaba agua, comida y el recuerdo de las indicaciones de su familia.',
                    'target_text' =>
    'Mixcoatl quis itech calli ayamo tlahuizcalli. Iohtli panoz hueca, icuitlapan in tepetl. Quihuicaya atl, tlaqualli ihuan quielnamiki in tlahtolli itech icalpulli.',
                    'vocabulary' => [
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                        [
                            'target' => 'Tepetl',
                            'spanish' => 'Cerro',
                        ],
                    ],
                ],
                [
                    'title' => 'El río',
                    'spanish_text' =>
                        'Después de caminar durante horas encontró un río. Se detuvo a descansar y observó cómo el agua seguía su camino alrededor de las piedras sin detenerse.',
                    'target_text' =>
    'Ihcuac miac nen, Mixcoatl asic itech ce huey atl. Ompa mosehui ihuan quittac quen in atl oc nenemi itzalan tetl, amo mocahua.',
                    'vocabulary' => [
                        [
                            'target' => 'Atl',
                            'spanish' => 'Agua',
                        ],
                        [
                            'target' => 'Tlalli',
                            'spanish' => 'Tierra',
                        ],
                    ],
                ],
                [
                    'title' => 'El fuego',
                    'spanish_text' =>
                        'Esa noche encendió un pequeño fuego y descansó bajo el cielo. Recordó las historias que había escuchado desde niño y comprendió por qué los viajeros aprendían observando la naturaleza.',
                    'target_text' =>
    'Inon yohualli Mixcoatl quitlati tletl ihuan mosehui itlan ilhuicatl. Quielnamic in huehuehtlahtolli tlen oquicac ipan ipiltontliyo, ihuan momachti tlachiaz ipan tlalticpac.',
                    'vocabulary' => [
                        [
                            'target' => 'Tletl',
                            'spanish' => 'Fuego',
                        ],
                        [
                            'target' => 'Metztli',
                            'spanish' => 'Luna',
                        ],
                    ],
                ],
                [
                    'title' => 'El regreso',
                    'spanish_text' =>
                        'Cuando finalmente volvió a casa, Mixcóatl comprendió que había regresado siendo diferente. El viaje le enseñó que conocer un camino también significa aprender a observar lo que existe alrededor.',
                    'target_text' =>
    'Ihcuac Mixcoatl mocuep calli, quimomati ca ayoc san quen achto. In iohtli quitlamachti ca quemman monequi tlachiaz ihuan quicaquiz moch tlen nemi inahuac.',
                    'vocabulary' => [
                        [
                            'target' => 'Calli',
                            'spanish' => 'Casa',
                        ],
                        [
                            'target' => 'Tonatiuh',
                            'spanish' => 'Sol',
                        ],
                    ],
                ],
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Crear o actualizar cuento
    |--------------------------------------------------------------------------
    */

    private function createStory(
        array $storyData,
        array $chapters
    ): void {
        /*
        |--------------------------------------------------------------------------
        | Compatibilidad con la tabla antigua "stories"
        |--------------------------------------------------------------------------
        |
        | El proyecto original tenía una columna "content" obligatoria.
        | Aunque ahora utilizamos story_chapters para almacenar el contenido
        | correctamente por capítulos, seguimos llenando "content" para mantener
        | compatibilidad con la estructura existente.
        |
        */

        $fullContent = collect($chapters)
            ->map(function (array $chapter) {
                return $chapter['spanish_text'];
            })
            ->implode("\n\n");

        $storyData['content'] = $fullContent;

        /*
        |--------------------------------------------------------------------------
        | Crear o actualizar el cuento
        |--------------------------------------------------------------------------
        */

        $story = Story::updateOrCreate(
            [
                'slug' => $storyData['slug'],
            ],
            $storyData
        );

        /*
        |--------------------------------------------------------------------------
        | Limpiar capítulos anteriores de ESTE cuento
        |--------------------------------------------------------------------------
        |
        | Esto hace que el seeder pueda ejecutarse nuevamente sin generar
        | capítulos duplicados o dejar capítulos antiguos.
        |
        */

        StoryChapter::query()
            ->where('story_id', $story->id)
            ->delete();

        /*
        |--------------------------------------------------------------------------
        | Crear capítulos
        |--------------------------------------------------------------------------
        */

        foreach ($chapters as $index => $chapter) {
            StoryChapter::create([
                'story_id' => $story->id,
                'chapter_number' => $index + 1,
                'title' => $chapter['title'],
                'spanish_text' => $chapter['spanish_text'],
                'target_text' => $chapter['target_text'] ?? null,
                'vocabulary' => $chapter['vocabulary'] ?? [],
                'image_url' => $chapter['image_url'] ?? null,
                'audio_url' => $chapter['audio_url'] ?? null,
            ]);
        }
    }
}