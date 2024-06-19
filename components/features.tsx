import Image from 'next/image'
import cloud from '@/public/images/cloud.webp'
import mobile from '@/public/images/mobile.webp'
import analytics from '@/public/images/analytics.svg'
import flexible from '@/public/images/flexible.svg'

export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Trust begins at home</h2>
            <p className="text-lg text-gray-400">Our suite of features allows IT, security and compliance teams handle fraud by blocking, 
              studying and reporting on known patterns discovered.</p>
          </div>

          {/* Items */}
          <div className="mt-6 max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.906 47.812C10.703 47.812 0 37.109 0 23.906C0 10.703 10.703 0 23.906 0C37.109 0 47.812 10.703 47.812 23.906C47.812 37.109 37.109 47.812 23.906 47.812ZM23.906 3.826C34.996 3.826 43.987 12.816 43.987 23.907C43.987 34.997 34.997 43.988 23.906 43.988C12.816 43.988 3.825 34.998 3.825 23.907C3.82158 21.1978 4.36797 18.5162 5.43109 16.0243C6.49421 13.5325 8.05195 11.2823 10.01 9.41C10.154 9.272 10.34 9.103 10.568 8.903L10.66 8.832C10.8526 8.70162 11.087 8.64827 11.317 8.68253C11.547 8.71679 11.7558 8.83616 11.902 9.017L11.921 9.04C12.0758 9.23176 12.1506 9.47592 12.1297 9.7215C12.1089 9.96708 11.994 10.1951 11.809 10.358C11.6286 10.5155 11.4519 10.6772 11.279 10.843C9.52341 12.5352 8.12755 14.5645 7.17508 16.8091C6.22261 19.0538 5.73314 21.4676 5.736 23.906C5.736 33.94 13.871 42.075 23.905 42.075C33.939 42.075 42.075 33.94 42.075 23.906C42.075 13.872 33.94 5.737 23.906 5.737V14.343C23.906 14.4686 23.8813 14.593 23.8332 14.709C23.7851 14.8251 23.7147 14.9305 23.6258 15.0193C23.537 15.1082 23.4316 15.1786 23.3155 15.2267C23.1995 15.2748 23.0751 15.2995 22.9495 15.2995C22.8239 15.2995 22.6995 15.2748 22.5835 15.2267C22.4674 15.1786 22.362 15.1082 22.2732 15.0193C22.1843 14.9305 22.1139 14.8251 22.0658 14.709C22.0177 14.593 21.993 14.4686 21.993 14.343V4.781C21.9929 4.64094 22.0237 4.50257 22.083 4.37569C22.1423 4.24881 22.2288 4.13652 22.3363 4.04675C22.4438 3.95698 22.5697 3.89193 22.7051 3.85621C22.8406 3.82048 22.9822 3.81495 23.12 3.84C23.38 3.83 23.643 3.826 23.906 3.826ZM12.937 14.344C12.117 13.172 13.336 11.953 14.507 12.774L26.906 21.421C29.133 22.968 29.507 25.593 27.656 27.514C25.757 29.366 23.133 28.967 21.586 26.741L12.937 14.344Z" fill="#716ACA"/>
              </svg>
              <h4 className="h4 mb-2">Real-Time Monitoring</h4>
              <p className="text-lg text-gray-400 text-center">Implement transaction monitoring in milliseconds, 
                enabling fine-grained control over which transactions are let through or investigated
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 29.5874C27.4286 29.5874 25.7143 31.1447 25.7143 33.4805C25.7143 35.0377 27 36.2057 28.2857 36.595L27 42.0453H32.5714L31.2857 36.595C33 36.2057 33.8571 35.0377 33.8571 33.4805C34.2857 31.1447 32.5714 29.5874 30 29.5874ZM30.4286 12.8472C27.4286 12.8472 24.4286 14.7937 24.4286 17.5189V23.3585H36V17.5189C35.5714 14.7937 33.4286 12.8472 30.4286 12.8472ZM30 0L0 11.6792V23.3585C0.428571 40.4881 12.4286 55.6711 30 61.9C47.5714 55.6711 59.5714 40.4881 60 23.3585V11.6792L30 0ZM47.1429 42.8239C47.1429 45.1598 45.4286 46.717 42.8571 46.717H17.1429C14.5714 46.717 12.8571 45.1598 12.8571 42.8239V27.2516C12.8571 24.9157 14.5714 23.3585 17.1429 23.3585H18.4286V17.5189C18.8571 12.0686 24 7.78616 30 7.78616C36 7.78616 41.1429 12.0686 41.5714 17.5189V23.3585H42.8571C45.4286 23.3585 47.1429 24.9157 47.1429 27.2516V42.8239Z" fill="#716ACA"/>
              </svg>
              <h4 className="h4 mb-2">Privacy First </h4>
              <p className="text-lg text-gray-400 text-center">Utilize your own data structure and metadata in your own cloud tenant.
                 Keep your sensitive information</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
            <Image alt='settings icon' className="w-16 h-16 mb-4" quality={100} src={flexible} width={16} height={16}/>
              <h4 className="h4 mb-2">Flexibility at its Core</h4>
              <p className="text-lg text-gray-400 text-center">Use no-code UI to create customizable decisions or use your own code to generate rules</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-blocks]">
              <Image alt='' className="w-16 h-16 mb-4" quality={100} src={analytics} width={16} height={16}/>
              <h4 className="h4 mb-2">Data Augmentation</h4>
              <p className="text-lg text-gray-400 text-center">Explore in-built ways to enhance in-house data to drive new insights for your analytics team
              </p>
            </div>

            {/* 5th item
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-purple-100" d="M29 42h10.229a2 2 0 001.912-1.412l2.769-9A2 2 0 0042 29h-7v-4c0-2.373-1.251-3.494-2.764-3.86a1.006 1.006 0 00-1.236.979V26l-5 6" />
                  <path className="stroke-current text-purple-300" d="M22 30h4v12h-4z" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Instant Features</h4>
              <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
            </div>

            {/* 6th item *
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g transform="translate(21 22)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-purple-300" d="M17 2V0M19.121 2.879l1.415-1.415M20 5h2M19.121 7.121l1.415 1.415M17 8v2M14.879 7.121l-1.415 1.415M14 5h-2M14.879 2.879l-1.415-1.415" />
                  <circle className="stroke-current text-purple-300" cx="17" cy="5" r="3" />
                  <path className="stroke-current text-purple-100" d="M8.86 1.18C3.8 1.988 0 5.6 0 10c0 5 4.9 9 11 9a10.55 10.55 0 003.1-.4L20 21l-.6-5.2a9.125 9.125 0 001.991-2.948" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Instant Features</h4>
              <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
            </div>
            */}
          </div> 

        </div>
      </div>
    </section>
  )
}
