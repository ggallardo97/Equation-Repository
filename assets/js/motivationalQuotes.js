const phrases = [
    {
        text : 'Todos somos muy ignorantes. Lo que ocurre es que no todos ignoramos las mismas cosas.',
        author: 'Albert Einstein'
    },
    {
        text : 'Toda la ciencia no es más que un refinamiento del pensamiento cotidiano.',
        author: 'Albert Einstein'
    },
    {
        text : 'No todo lo que cuenta puede ser cuantificado, y no todo lo que puede ser cuantificado cuenta.',
        author: 'Albert Einstein'
    },
    {
        text : 'Lo importante es no dejar nunca de hacer preguntas. No perder jamás la bendita curiosidad.',
        author: 'Albert Einstein'
    },
    {
        text : 'La imaginación es más importante que el conocimiento.',
        author: 'Albert Einstein'
    },
    {
        text : 'Hay una fuerza motriz más poderosa que el vapor, la electricidad y la energía atómica: la voluntad.',
        author: 'Albert Einstein'
    },
    {
        text : 'Observa detenidamente tu entorno y comprenderás mejor el funcionamiento de las cosas.',
        author: 'Albert Einstein'
    },
    {
        text : 'Para alcanzar el conocimiento, solamente tienes que experimentar.',
        author: 'Albert Einstein'
    },
    {
        text : 'La ciencia se centra en lo que una realidad es, no en lo que podría ser.',
        author: 'Albert Einstein'
    },
    {
        text : 'Un hombre puede imaginar cosas que son falsas, pero sólo puede entender cosas que son verdad.',
        author: 'Isaac Newton'
    },
    {
        text : 'Puedo calcular el movimiento de los cuerpos celestes, pero no la locura de la gente.',
        author: 'Isaac Newton'
    },
    {
        text : 'La naturaleza se complace con la simplicidad. Y la naturaleza no es ninguna tonta.',
        author: 'Isaac Newton'
    },
    {
        text : 'Para cada acción hay siempre una reacción opuesta equivalente.',
        author: 'Isaac Newton'
    },
    {
        text : 'Ningún gran descubrimiento fue hecho jamás sin una conjetura audaz.',
        author: 'Isaac Newton'
    },
    {
        text : 'Lo que sabemos es una gota de agua; lo que ignoramos es el océano.',
        author: 'Isaac Newton'
    },
    {
        text : 'Platón es mi amigo, Aristóteles es mi amigo, pero mi mejor amigo es la verdad.',
        author: 'Isaac Newton'
    },
    {
        text : 'La unidad es la variedad, y la variedad en la unidad es la ley suprema del universo.',
        author: 'Isaac Newton'
    },
    {
        text : 'El día que la ciencia comience a estudiar los fenómenos no físicos, va a tener más progresos en una sola década que en todos los siglos previos de su existencia.',
        author: 'Nikola Tesla'
    },
    {
        text : 'En el siglo veintiuno, el robot tomará el lugar que el laborioso esclavo ocupó en la civilización antigua.',
        author: 'Nikola Tesla'
    },
    {
        text : 'De todas las resistencias, la que más retarda la evolución es la ignorancia.',
        author: 'Nikola Tesla'
    },
    {
        text : 'La historia de las ciencias nos demuestra que las teorías son perecederas.',
        author: 'Nikola Tesla'
    },
    {
        text : 'La vida es y seguirá siendo una ecuación incapaz de solución, pero contiene ciertos factores conocidos.',
        author: 'Nikola Tesla'
    },
    {
        text : 'Estar solo, ese es el secreto de la invención; estando solo es cuando nacen las ideas.',
        author: 'Nikola Tesla'
    },
    {
        text : 'Si lo que quieres es encontrar los secretos del universo, piensa en términos de energía, frecuencia y vibración.',
        author: 'Nikola Tesla'
    },
    {
        text : 'Uno no puede discutir con un teorema matemático.',
        author: 'Stephen Hawking'
    },
    {
        text : 'Einstein se equivocaba cuando decía que - Dios no juega a los dados con el universo- Considerando las hipótesis de los agujeros negros, Dios no solo juega a los dados con el universo: a veces los arroja donde no podemos verlos.',
        author: 'Stephen Hawking'
    },
    {
        text : 'Debemos intentar comprender el comienzo del universo a partir de bases científicas.',
        author: 'Stephen Hawking'
    },
    {
        text : 'La inteligencia es la capacidad de adaptarse al cambio.',
        author: 'Stephen Hawking'
    },
    {
        text : 'La humanidad tiene un margen de mil años antes de autodestruirse a manos de sus avances científicos y tecnológicos.',
        author: 'Stephen Hawking'
    },
    {
        text : 'El peor enemigo del conocimiento no es la ignorancia, es la ilusión del conocimiento.',
        author: 'Stephen Hawking'
    },
    {
        text : 'La ciencia no solo es una disciplina de razón, sino también de romance y pasión.',
        author: 'Stephen Hawking'
    },
    {
        text : 'El universo está gobernado por la ciencia. Pero la ciencia nos dice que no podemos resolver las ecuaciones directamente en los abstracto.',
        author: 'Stephen Hawking'
    },
    {
        text : 'Hay tres clases de hombres: aquellos que ven, aquellos que ven cuando se les muestra y aquellos que no ven.',
        author: 'Leonardo da Vinci'
    },
    {
        text : 'He ofendido a Dios y a la humanidad porque mi trabajo no ha alcanzado la calidad que debería tener.',
        author: 'Leonardo da Vinci'
    },
    {
        text : 'Para desarrollar una mente completa: estudia la ciencia del arte, estudia el arte de la ciencia.',
        author: 'Leonardo da Vinci'
    },
    {
        text : 'La naturaleza es la fuente del conocimiento verdadero. Tiene su propia lógica, sus propias leyes, no tiene efecto sin causa ni invención sin necesidad.',
        author: 'Leonardo da Vinci'
    },
    {
        text : 'Siempre la práctica debe ser construida sobre una buena teoría, de la cual la perspectiva es la guía y la puerta, y sin esta nada se hace bien.',
        author: 'Leonardo da Vinci'
    }
];

const mainDashboard = document.getElementById('mainDashboard');
let randomNumber = Math.floor(Math.random() * phrases.length);
let randomPhrase = phrases[randomNumber];
let phraseTemplate = '<div class="col-xl-9 col-md-6 mb-4"><div class="card border-left-info shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><div class="h6 mb-0 font-weight-bold text-gray-800">"'+randomPhrase.text+'"</div><div class="text-sm font-weight-bold text-dark mb-1">- '+randomPhrase.author+'</div></div></div></div></div></div></div>';

mainDashboard.innerHTML += phraseTemplate;
