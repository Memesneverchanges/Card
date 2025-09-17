import { TLocalization } from "./Reducers/appReducer"

export const contacts = {
    gitHub: 'https://github.com/Memesneverchanges',
    email: 'Parshintsev.ig@yandex.ru',
    number: '+7 (950) 409-19-07',
    tg: 'https://t.me/acidexecution',
    vk: 'https://vk.com/id343862991',
    wa: 'https://wa.me/79504091907'
}

export type TMultiLanguage<T> = {
    [n in TLocalization]?: T
}

export interface ISkillInfo<TName, TAdditionalInfo> {
    name: TName
    level?: number
    additionalInfoTitle?: TName
    additionalInfo?: TAdditionalInfo
}

export interface IArticleParagraphContent<TValue, TList> {
    title: TValue
    list: TList
}

export interface IPartContent<TValue, TArticleList> {
    id: keyof IPageContent<any, any, any>
    title: TValue
    articles: IArticleParagraphContent<TValue, TArticleList>[]
}

export interface INavButton<TValue> {
    hint: TValue
    title: TValue
    navToCard: keyof IPageContent<any, any, any>
}

export interface INavButtonsContent<TValue> {
    navButtons: INavButton<TValue>[]
}

export interface IAboutPartContent<TValue, TArticleList> extends IPartContent<TValue, TArticleList>, INavButtonsContent<TValue> {
    helloWord: TValue
    pre: TValue
}

export interface ISkillsPartContent<TValue, TArticleList> extends IPartContent<TValue, TArticleList>, INavButtonsContent<TValue> { }

export interface IAchievmentsPartContent<TValue> extends IPartContent<TValue, TValue>, INavButtonsContent<TValue> { }

export interface IPageContent<TValue, TArticleList, TSkillArticleList> {
    about: IAboutPartContent<TValue, TArticleList>
    skills: ISkillsPartContent<TValue, TArticleList | TSkillArticleList>
    achievementsFirstPart: IAchievmentsPartContent<TValue>
    achievementsSecondPart: IAchievmentsPartContent<TValue>
    contacts: IPartContent<TValue, TArticleList>
}
const myYearsOld = new Date(new Date().getTime() - new Date(1998, 5, 18).getTime()).getFullYear() - 1970
export const pageContent: IPageContent<TMultiLanguage<string>, TMultiLanguage<string[]>, ISkillInfo<TMultiLanguage<string>, TMultiLanguage<string[]>>[]> = {

    about: {
        id: 'about',
        title: { ru: 'Обо мне', en: 'About' },
        helloWord: { ru: 'Привет,', en: 'Hello,' },
        navButtons: [{ hint: { ru: 'Перейти к навыкам', en: 'Go to «Skills»' }, title: { ru: 'Навыки', en: 'Skills' }, navToCard: 'skills' }],
        pre: { ru: `Я Паршинцев Игорь, ${myYearsOld} лет, JavaScript-NodeJS fullstack разработчик. Проживаю в Красноярске`, en: `I'm Parshintsev Igor, ${myYearsOld} years old JavaScript-NodeJS fullstack developer. Live in Krasnoyarsk` },
        articles: [
            {
                title: { ru: 'Опыт работы', en: 'Experience' },
                list: {
                    ru: [
                        'С 03.11.20 по 24.10.21 инженер АСУТП',
                        "С 01.11.21 по 03.06.24 Fullstack разработчик",
                        "С 14.06.24 Ведущий разработчик"
                    ],
                    en: [
                        "From 03.11.20 to 24.10.21 Automated control system engineer",
                        "From 01.11.21 to 03.06.24 Fullstack developer",
                        "From 14.06.24 Teamlead"
                    ]
                }
            },
            {
                title: { ru: 'Образование', en: 'Education' },
                list: {
                    ru: [
                        `2020 - Бакалавриат с отличием "Автоматизация технологических процессов и производств" ИКИТ СФУ`,
                        `2023 - Магистратура с отличием "Информационные системы и технологии" ИКИТ СФУ`
                    ],
                    en: [
                        "2020 - Bachelor's degree with honours of Technological processes automatization SibFU",
                        "2023 - Master's degree with honours of Information systems and technologies SibFU"
                    ]
                }
            },
        ]
    },
    skills: {
        id: 'skills',
        title: { ru: 'Навыки', en: 'Skills' },
        navButtons: [{ hint: { ru: 'Перейти к информации обо мне', en: 'Go to «About»' }, title: { ru: 'Обо мне', en: 'About' }, navToCard: 'about' }, { hint: { ru: 'Перейти к достижениям ч.1', en: 'Go to «Achievements p.1»' }, title: { ru: 'Достижения ч.1', en: 'Achievements p.1' }, navToCard: 'achievementsFirstPart' }],
        articles: [
            {
                title: { ru: 'Языки программирования', en: 'Programming languages' },
                list: [

                    {
                        name: { en: 'NodeJS' },
                        level: 90,
                        additionalInfoTitle: { ru: 'Фреймворки и библиотеки', en: 'Frameworks and libraries' },
                        additionalInfo: {
                            en: ['Express', 'Apollo Server', 'NestJS', 'Sequelize', 'TypeORM', 'Puppeteer', 'Crawlee']
                        }
                    },
                    {
                        name: { en: 'JavaScript' },
                        level: 70,
                        additionalInfoTitle: { ru: 'Фреймворки и библиотеки', en: 'Frameworks and libraries' },
                        additionalInfo: {
                            en: ['React', 'React Router', 'DevExtreme', 'Apollo Client', 'Effector', 'Zustand']
                        }
                    },
                    {
                        name: { en: 'Typescript' },
                        level: 80,
                        additionalInfo: {
                            en: ['Utility types', 'Generics', 'Union types', 'Enums', 'Interfaces', 'Classes']
                        }
                    },
                    {
                        name: { en: 'C#' },
                        level: 40,
                        additionalInfoTitle: { ru: 'Фреймворки и библиотеки', en: 'Frameworks and libraries' },
                        additionalInfo: {
                            en: ['EntityFramework', 'WinForms', 'WinService']
                        }
                    },
                    {
                        name: { en: 'C++' },
                        level: 30,
                        additionalInfoTitle: { ru: 'Фреймворки и библиотеки', en: 'Frameworks and libraries' },
                        additionalInfo: {
                            en: ['WinAPI']
                        }
                    },

                ]
            },
            {
                title: { ru: 'Базы данных', en: 'Databases' },
                list: [
                    {
                        name: { en: 'Basic', ru: 'Основные' },
                        additionalInfoTitle: { en: 'Basic database design skills', ru: 'Основные навыки проектирования баз данных' },
                        additionalInfo: {
                            en: ['Migrations', 'Constraints', 'Indexes', 'CTE', 'Stored procedures', 'Functions', 'Aggregate functions'],
                            ru: ['Миграции', 'Ограничения', 'Индексы', 'CTE', 'Хранимые процедуры', 'Функции', 'Агрегатные функции']
                        }
                    },
                    {
                        name: { en: 'MSSQL' },
                        additionalInfoTitle: { ru: 'Особенности', en: 'Features' },
                        additionalInfo: {
                            en: ['Merge operator', 'Sheduling'],
                            ru: ['Merge оператор', 'Выполнение по расписанию',]
                        }
                    },
                    {
                        name: { en: 'PostgreSQL' },
                        additionalInfoTitle: { ru: 'Особенности', en: 'Features' },
                        additionalInfo: {
                            en: ['PostGIS', 'Custom data types', 'Jsonb'],
                            ru: ['PostGIS', 'Пользовательские типы данных', 'Jsonb']
                        }
                    }
                ]
            },
            {
                title: { ru: 'Публикация приложений', en: 'Deploying' },
                list: [
                    {
                        name: { en: 'Docker' },
                        additionalInfo: {
                            en: ['Dockerfile', 'Docker compose', 'Volumes', 'Disk space usage optimization'],
                            ru: ['Dockerfile', 'Docker compose', 'Тома', 'Оптимизация используемого дискового пространства']
                        }
                    },
                    {
                        name: { en: 'Nginx' },
                        additionalInfo: {
                            en: ['Applications hosting', 'Redirection', 'Certbot integration', 'Subdomains'],
                            ru: ['Публикация приложений', 'Перенаправление', 'Certbot интеграция', 'Поддомены']
                        }
                    },
                    {
                        name: { en: 'node-windows' },
                        additionalInfo: {
                            en: ['Windows deploying library for Node JS'],
                            ru: ['библиотека для публикации приложений Node JS для Windows']
                        }
                    },
                ]
            },
            {
                title: { ru: 'Общие', en: 'Common' },
                list: [
                    {
                        name: { en: 'Azure DevOps' },
                        additionalInfoTitle: { en: 'Using', ru: 'Использую' },
                        additionalInfo: {
                            en: ['Work items', 'Azure Pipelines','pull requests']
                        }
                    },
                    {
                        name: { en: 'Git' },
                        level: 50,
                        additionalInfoTitle: { en: 'Using', ru: 'Использую' },
                        additionalInfo: {
                            en: ['pull, push','stage, commit', 'merge', 'rebase', 'reset', 'PR', 'GitFlow']
                        }
                    },
                    {
                        name: { en: 'CSS3' },
                        level: 60,
                        additionalInfoTitle: { en: 'Using', ru: 'Использую' },
                        additionalInfo: {
                            en: ['classes, ids', 'flex', 'grid', 'media queries', 'pseudo-elements', 'keyframes']
                        }
                    },
                    {
                        name: { en: 'RabbitMQ' },
                        level: 45,
                        additionalInfoTitle: { en: 'Using', ru: 'Использую' },
                        additionalInfo: {
                            en: ['exchangers (topic, direct)', 'custom exchangers (delayed-message-exchange)', 'WebSocket STOMP connection'],
                        }
                    },
                    {
                        name: { en: 'MinIO' },
                        level: 60,
                        additionalInfoTitle: { en: 'Using', ru: 'Использую' },
                        additionalInfo: {
                            en: ['Buckets', 'Public/Private access', 'hash-naming'],
                        }
                    },
                ]
            },
            {
                title: { ru: 'Другие навыки', en: 'Other' },
                list: {
                    ru: [
                        'Разработка ПО контроллеров(Logix designer,TIA portal) и HMI(TIA portal, Factory Talk View, iFix, InTouch)',
                        'Разработка ПО микроконтроллеров(CodeVisionAVR,Proteus 8)',
                    ],
                    en: [
                        'Controller programming(Logix designer,TIA portal) and HMI creating(TIA portal, Factory Talk View, iFix, InTouch)',
                        'Microcontroller programming(CodeVisionAVR,Proteus 8)',

                    ]
                }
            }
        ]
    },
    achievementsFirstPart: {
        id: 'achievementsFirstPart',
        title: { ru: 'Достижения часть 1', en: 'Achievements part 1' },
        articles: [{
            title: { ru: 'SSPI авторизация', en: 'SSPI authentication' },
            list: {
                ru: 'Совместно с коллегами разработана система авторизации внутри экосистемы, оснащенная редактром прав доступа пользователей на основе данных AD',
                en: 'Authorization system with AD users access editor has been developed by me with colleagues'
            }
        },
        {
            title: { ru: 'Планировщик SQL запросов', en: 'SQL query scheduler' },
            list: {
                ru: 'Разработано приложение выполняющее SQL запросы и формирующее отчеты в виде электронных писем и сообщений Signal. Имеет встроенный редактор, тестировочный механизм для расписаний и запросов, историю выполнения',
                en: 'Designed application executes SQL queries by shedule and generates messages through emails and Signal messages. Provides editor, shedule and query tester, executing history'
            }
        },
        {
            title: { ru: 'Корпоративный портал', en: 'Corporate portal' },
            list: {
                ru: 'Корпоративный портал, предоставляющий доступ к модулям системы, собирающий стастистику о действиях и посещениях через Matomo',
                en: 'Corporate portal provides access to modules of the system, collects actions and visits metrics through Matomo tracker'
            }
        },
        {
            title: { ru: 'Модуль отправки электронных писем', en: 'Email sending module' },
            list: {
                ru: 'Разработан модуль для централизованной отправки электронных писем через брокер сообщений RabbitMQ, логированием в БД, механизмом переотправки через брокера',
                en: 'Module designed for centralized email sending through RabbitMQ message broker with logging into a database, resending algorithm'
            }
        },
        {
            title: { ru: 'Модуль уточнения геоданных', en: 'Geodata detailing module' },
            list: {
                ru: 'Разработан многопоточный асинхронный модуль, анализирующий сообщения АСУ ГТК. При соблюдении условий, выполняет подключение через TCP и записывает сообщения NMEA 0183 в БД',
                en: 'Multithreaded asynchronous module designed for analizing messages of automated control system mining and transport complex. If the conditions are met, it connects via TCP and writes NMEA 0183 messages to database'
            }
        }

        ],
        navButtons: [{ hint: { ru: 'Перейти к навыкам', en: 'Go to «Skills»' }, title: { ru: 'Навыки', en: 'Skills' }, navToCard: 'skills' },{ hint: { ru: 'Перейти к достижениям ч.2', en: 'Go to «Achievements p.2»' }, title: { ru: 'Достижения ч.2', en: 'Achievements p.2' }, navToCard: 'achievementsSecondPart' }]
    },
    achievementsSecondPart: {
        id: 'achievementsSecondPart',
        title: { ru: 'Достижения часть 2', en: 'Achievements part 2' },
        articles: [
        {
            title: { ru: 'Руководство проектом', en: 'Project management' },
            list: {
                ru: 'Руководил приемом ПО от подрядной организации. Выявлял неисправности программного обеспечения и предлагал их решение. Организовал процесс формирования требований к ПО',
                en: 'Managed the acceptance of software from a contractor. Identified software faults and proposed solutions. Organized the process of forming software requirements'
            }
        },
        {
            title: { ru: 'Ведение разработки', en: 'Teamleading' },
            list: {
                ru: 'Осуществлял подбор кадров. Формировал и декомпозировал задачи разработчикам. Помогал разработчикам формировать решение задач и проводил code review',
                en: 'Carried out personnel selection. Formed and decomposed tasks for developers. Helped developers formulate solutions to tasks and conducted code review'
            }
        },
        {
            title: { ru: 'Проектирование архитектуры ПО', en: 'Software architecture design' },
            list: {
                ru: 'Унифицировал логику работы разных платформ ПО в одной кодовой базе. Уменьшил количество cron расписаний за счет коммуникаций между модулями. Изменил коммуникацию между модулями с HTML запросов на RabbitMQ. Пересмотрел архитектуру БД, что позволило уменьшить избыточность таблиц и сократить их количество с 151 до 128',
                en: 'Unified the logic of different software platforms in one code base. Reduced the number of cron schedules due to communication between modules. Changed communication between modules from HTML requests to RabbitMQ. Revised the database architecture, which allowed to reduce the redundancy of tables and reduce their number from 151 to 128'
            }
        },
        {
            title: { ru: 'Системное администрирование', en: 'System administration' },
            list: {
                ru: 'Поддерживал работу приложений на серверах, настраивал Nginx. Определял характеристики сервера, требуемые для работы приложений. Развернул и интегрировал мониторинговую систему Sentry (selfhosted) в модули системы, что позволило разработчикам быстро исправлять неисправности системы',
                en: 'Supported the operation of applications on servers, configured Nginx. Determined the server characteristics required to run applications. Deployed and integrated the Sentry monitoring system (selfhosted) into the system modules, which allowed developers to quickly fix system malfunctions'
            }
        }
        ],
        navButtons: [{ hint: { ru: 'Перейти к достижениям ч.1', en: 'Go to «Achievements p.1»' }, title: { ru: 'Достижения ч.1', en: 'Achievements p.1' }, navToCard: 'achievementsFirstPart' }, { hint: { ru: 'Перейти к контактам', en: 'Go to «Contacts»' }, title: { ru: 'Контакты', en: 'Contacts' }, navToCard: 'contacts' }]
    },
    contacts: {
        id: 'contacts',
        title: { ru: 'Контакты', en: 'Contacts' },
        articles: []
    }
}

export function localizePageContent(pageContent: any, localization: TLocalization): any {
    let content = JSON.parse(JSON.stringify(pageContent))
    let allLocalizations:TLocalization[] = ['en', 'ru']
    let otherLocalizations = allLocalizations.filter(el => el !== localization)
    let localizations = [localization, ...otherLocalizations]
    for (let field in pageContent) {
        if (Array.isArray(pageContent[field])) {
            for (let i = 0; i < pageContent[field].length; i++) {
                if (typeof pageContent[field][i] === 'object') {
                    content[field][i] = localizePageContent(content[field][i], localization)
                }
                else
                    content[field][i] = pageContent[field][i]
            }
            continue
        }
        if (typeof pageContent[field] === 'object') {
            let localizationFound = false
            for (let localization of localizations) {
                if (pageContent[field][localization] !== undefined) {
                    content[field] = pageContent[field][localization]
                    localizationFound = true
                    break
                }
            }
            if (!localizationFound) {
                content[field] = localizePageContent(content[field], localization)
            }
        }
        else
            content[field] = pageContent[field]

    }

    return content
}