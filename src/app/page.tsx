import Image from "next/image";
import dandqImage from "../../public/image-d&q.svg"
import paso1 from "../../public/Image_paso1.svg"
import paso2 from "../../public/Image_paso2.svg"
import paso3 from "../../public/Image_paso3.svg"
import linkedin from "../../public/LinkedIn.svg"

//bg-[#3E3838] bg-[#BEA5A5] bg-[#000000] bg-[#828282] bg-[#B2ADAD] bg-[#C4C3C3]


export default function Home() {
  return (
    <main className="min-h-screen bg-[#3E3838] text-[#BEA5A5] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <header className="py-8">
          <a href="/"><h1 className="font-bold text-2xl">D&Q</h1></a>
        </header>

        <section className="relative h-screen flex flex-col items-center justify-center text-center mb-32">
          <Image
            src={dandqImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0 opacity-50 rounded-lg"
          />
          <div className="relative z-10 px-4">
            <h1 className="text-5xl font-bold mb-4 text-[#BEA5A5]">Divide y Conquista<br />Objetivos</h1>
            <p className="text-xl mb-8 text-[#BEA5A5]">La manera más eficiente y rápida de conseguir tus objetivos</p>
            <a href="/login" className="bg-black text-white font-bold px-6 py-2 rounded">HAZLO YA</a>
          </div>
        </section>

        <div className="space-y-32">
          <section className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Paso 1</h2>
              <div>
                <p className="text-[#828282] mb-4">Mete un usuario y contraseña cualquiera en la pantalla principal.</p>
                <p className="text-[#828282] mb-4">Pd: Guárdalos porque es con los que tienes que entrar cada día.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image src={paso1} alt="Paso 1" layout="responsive" width={16} height={9} />
            </div>
          </section>

          <section className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2">
              <Image src={paso2} alt="Paso 2" layout="responsive" width={16} height={9} />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Paso 2</h2>
              <div>
                <p className="text-[#828282] mb-4">Cliqua en añadir uno. Rellena el pequeño formulario y ve a por ello.</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Paso 3</h2>
              <div>
                <p className="text-[#828282] mb-4">Marca la casilla "Entrar todos los días a D&Q", esta es la clave para no fallar. Si no entras todos los días y marcas esa casilla, todos los objetivos diarios que vayas poniendo se te borrarán y empezarás de cero.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image src={paso3} alt="Paso 3" layout="responsive" width={16} height={9} />
            </div>
          </section>
        </div>

        <section className="my-60 text-center">
          <h2 className="text-4xl text-black font-bold mb-4">Toma acción ¡¡YA!!</h2>
          <p className="text-[#B2ADAD] mb-2">Tienes la herramienta</p>
          <p className="text-[#B2ADAD] mb-2">Tienes los objetivos</p>
          <p className="text-[#B2ADAD] mb-4">Tienes las ganas</p>
          <p className="text-white font-bold mb-4">Crea los hábitos pinchando en el siguiente botón.</p>
          <a href="/login" className="bg-black text-white font-bold px-6 py-2 rounded">HAZLO YA</a>
        </section>

        <footer className="text-center py-16">
          <p className="mb-4 font-semibold">Solo para los más atrevidos</p>
          <a href="https://www.linkedin.com/in/juan-garc%C3%ADa-rodr%C3%ADguez-a088292b0/">
            <div className="flex items-center justify-center">
              <Image src={linkedin} alt="LinkedIn" className="w-10 h-10 mr-2" />
              <span className="bg-[#C4C3C3] text-black font-semibold px-3 py-1 rounded">Creador de D&Q</span>
            </div>
          </a>
        </footer>
      </div>
    </main>
  );
}