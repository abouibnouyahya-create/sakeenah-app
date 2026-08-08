import urllib.request
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sakeenah API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API Sakeenah"}

@app.get("/api/prayertimes")
def get_prayer_times(city: str = "Paris", country: str = "France"):
    try:
        url = f"https://api.aladhan.com/v1/timingsByCity?city={city}&country={country}&method=2"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            timings = data["data"]["timings"]
            return {
                "city": city,
                "country": country,
                "fajr": timings["Fajr"],
                "dhuhr": timings["Dhuhr"],
                "asr": timings["Asr"],
                "maghrib": timings["Maghrib"],
                "isha": timings["Isha"]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/reciters")
def get_reciters():
    return [
        {
            "id": "1",
            "name": "Mishary Rashid Alafasy",
            "style": "Hafs an Asim",
            "surahs": [
                {"number": 1, "name": "Al-Fatiha", "url": "https://server8.mp3quran.net/afs/001.mp3"},
                {"number": 67, "name": "Al-Mulk", "url": "https://server8.mp3quran.net/afs/067.mp3"},
                {"number": 112, "name": "Al-Ikhlas", "url": "https://server8.mp3quran.net/afs/112.mp3"}
            ]
        },
        {
            "id": "2",
            "name": "Abdul Rahman Al-Sudais",
            "style": "Hafs an Asim",
            "surahs": [
                {"number": 1, "name": "Al-Fatiha", "url": "https://server11.mp3quran.net/sds/001.mp3"},
                {"number": 36, "name": "Ya-Sin", "url": "https://server11.mp3quran.net/sds/036.mp3"},
                {"number": 55, "name": "Ar-Rahman", "url": "https://server11.mp3quran.net/sds/055.mp3"}
            ]
        },
        {
            "id": "3",
            "name": "Maher Al-Muaiqly",
            "style": "Hafs an Asim",
            "surahs": [
                {"number": 1, "name": "Al-Fatiha", "url": "https://server12.mp3quran.net/maher/001.mp3"},
                {"number": 18, "name": "Al-Kahf", "url": "https://server12.mp3quran.net/maher/018.mp3"},
                {"number": 56, "name": "Al-Waqi'a", "url": "https://server12.mp3quran.net/maher/056.mp3"}
            ]
        }
    ]

@app.get("/api/prophets")
def get_prophets():
    return [
        {
            "id": "p1",
            "name": "Adam (AS)",
            "title": "Le Père de l'Humanité",
            "summary": "Adam fut le premier homme et le premier prophète créé par Allah. Il incarne le début de l'humanité, l'apprentissage du repentir sincère et la miséricorde divine infinie.",
            "full_story": "Allah créa Adam à partir d'argile et lui insuffla la vie. Il lui enseigna le nom de toutes choses, démontrant ainsi la valeur du savoir. Après avoir commis l'erreur de goûter au fruit de l'arbre interdit suite aux insinuations d'Iblis, Adam et Hawa prirent conscience de leur faute et demandèrent immédiatement pardon avec humilité. Allah accepta leur repentir et les établit sur Terre comme guides.",
            "lessons": ["La valeur inestimable de la connaissance", "La puissance du repentir immédiat", "L'humilité face aux erreurs"]
        },
        {
            "id": "p2",
            "name": "Ibrahim (AS)",
            "title": "L'Ami Intime d'Allah (Khalilullah)",
            "summary": "Symbole absolu de la foi pure et du Tawakkul (confiance totale), Ibrahim a remis en question le polythéisme de son peuple dès son jeune âge.",
            "full_story": "Ibrahim observa les étoiles, la lune et le soleil pour démontrer logiquement à son peuple que seul le Créateur incréé mérite l'adoration. Jeté dans un brasier ardent par le roi Nimrod, Allah ordonna au feu d'être 'fraîcheur et paix' pour lui. Plus tard, soumis à la lourde épreuve de sacrifier son fils Ismail, son obéissance exemplaire mena à la miséricorde d'Allah et à l'édification de la Kaaba.",
            "lessons": ["La réflexion logique et la quête de vérité", "La confiance absolue dans les épreuves", "La soumission sincère à la volonté divine"]
        },
        {
            "id": "p3",
            "name": "Youssef (AS)",
            "title": "Le Noble, Fils du Noble",
            "summary": "Un récit fascinant sur la patience (Sabr), le pardon et le passage de l'épreuve à la grandeur.",
            "full_story": "Jalousé par ses frères et jeté au fond d'un puits, Youssef fut vendu comme esclave en Égypte. Confronté aux fausses accusations de l'épouse d'Al-Aziz, il préféra la prison à la transgression. Grâce au don d'interprétation des rêves accordé par Allah, il sauva l'Égypte de la famine et devint le ministre des finances. Lors des retrouvailles avec ses frères, il leur pardonna sans rancune.",
            "lessons": ["La patience magnifique (Sabr Jameel)", "La pureté morale face à la tentation", "La capacité de pardonner à ceux qui nous ont fait du tort"]
        },
        {
            "id": "p4",
            "name": "Moussa (AS)",
            "title": "Celui qui parla à Allah (Kalimullah)",
            "summary": "L'histoire du courage face à la tyrannie de Pharaon et du guidage du peuple d'Israël vers la liberté.",
            "full_story": "Élevé dans le palais même de Pharaon, Moussa dût fuir vers Madyan après un incident. C'est dans le désert, au mont Tour, qu'Allah lui parla et lui confia la mission de libérer le peuple opprimé. Armé des miracles de son bâton et soutenu par son frère Haroun, il affonta Pharaon. Cerné entre l'armée égyptienne et la mer, Moussa déclara avec foi : 'Mon Seigneur est avec moi, Il me guidera', et la mer se fendit.",
            "lessons": ["Le courage indomptable contre l'oppression", "La confiance absolue au bord de l'impossible", "Le soutien fraternel"]
        }
    ]

@app.get("/api/courses")
def get_courses():
    return [
        {
            "id": "c1",
            "category": "spirituel",
            "title": "Les Fondements du Tawakkul",
            "description": "Apprenez à combiner l'effort sincère et le lâcher-prise émotionnel.",
            "level": "Débutant • 3 leçons",
            "steps": [
                {
                    "id": "c1_s1",
                    "title": "1. Définir le Tawakkul",
                    "duration": "3 min",
                    "content": "Le Tawakkul ne signifie pas l'inactivité. C'est attacher son chameau d'abord (faire tous les efforts humains possibles), puis placer sa confiance entière en Allah pour le résultat final."
                },
                {
                    "id": "c1_s2",
                    "title": "2. Libérer l'anxiété du résultat",
                    "duration": "4 min",
                    "content": "Une fois vos actions accomplies, l'inquiétude devient inutile. Acceptez que le décret divin renferme toujours une sagesse supérieure, même lorsqu'il diffère de nos attentes."
                },
                {
                    "id": "c1_s3",
                    "title": "3. Pratique quotidienne de l'abandon",
                    "duration": "5 min",
                    "content": "Chaque soir, récapitulez vos efforts du jour et répétez mentalement : 'J'ai fait ma part, le reste appartient à Mon Créateur'."
                }
            ]
        },
        {
            "id": "c2",
            "category": "psycho",
            "title": "Régulation du Stress & Anxiété",
            "description": "Techniques neuroscientifiques et ancrage spirituel pour apaiser le mental.",
            "level": "Intermédiaire • 2 leçons",
            "steps": [
                {
                    "id": "c2_s1",
                    "title": "1. Le rôle du système nerveux",
                    "duration": "4 min",
                    "content": "L'anxiété active le mode 'combat ou fuite'. En ralentissant volontairement la respiration, vous envoyez un signal biologique immédiat de sécurité à votre cerveau."
                },
                {
                    "id": "c2_s2",
                    "title": "2. Recadrage des pensées intrusives",
                    "duration": "5 min",
                    "content": "Quand une pensée anxieuse survient, observez-la sans la juger. Remplacez 'Et si le pire arrivait ?' par 'Même si une épreuve survient, j'aurai les ressources pour la surmonter'."
                }
            ]
        }
    ]import urllib.request
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sakeenah API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API Sakeenah"}

@app.get("/api/prayertimes")
def get_prayer_times(city: str = "Paris", country: str = "France"):
    try:
        url = f"https://api.aladhan.com/v1/timingsByCity?city={city}&country={country}&method=2"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            timings = data["data"]["timings"]
            return {
                "city": city,
                "country": country,
                "fajr": timings["Fajr"],
                "dhuhr": timings["Dhuhr"],
                "asr": timings["Asr"],
                "maghrib": timings["Maghrib"],
                "isha": timings["Isha"]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/reciters")
def get_reciters():
    return [
        {
            "id": "1",
            "name": "Mishary Rashid Alafasy",
            "style": "Hafs an Asim",
            "surahs": [
                {"number": 1, "name": "Al-Fatiha", "url": "https://server8.mp3quran.net/afs/001.mp3"},
                {"number": 67, "name": "Al-Mulk", "url": "https://server8.mp3quran.net/afs/067.mp3"},
                {"number": 112, "name": "Al-Ikhlas", "url": "https://server8.mp3quran.net/afs/112.mp3"}
            ]
        },
        {
            "id": "2",
            "name": "Abdul Rahman Al-Sudais",
            "style": "Hafs an Asim",
            "surahs": [
                {"number": 1, "name": "Al-Fatiha", "url": "https://server11.mp3quran.net/sds/001.mp3"},
                {"number": 36, "name": "Ya-Sin", "url": "https://server11.mp3quran.net/sds/036.mp3"},
                {"number": 55, "name": "Ar-Rahman", "url": "https://server11.mp3quran.net/sds/055.mp3"}
            ]
        },
        {
            "id": "3",
            "name": "Maher Al-Muaiqly",
            "style": "Hafs an Asim",
            "surahs": [
                {"number": 1, "name": "Al-Fatiha", "url": "https://server12.mp3quran.net/maher/001.mp3"},
                {"number": 18, "name": "Al-Kahf", "url": "https://server12.mp3quran.net/maher/018.mp3"},
                {"number": 56, "name": "Al-Waqi'a", "url": "https://server12.mp3quran.net/maher/056.mp3"}
            ]
        }
    ]

@app.get("/api/prophets")
def get_prophets():
    return [
        {
            "id": "p1",
            "name": "Adam (AS)",
            "title": "Le Père de l'Humanité",
            "summary": "Adam fut le premier homme et le premier prophète créé par Allah. Il incarne le début de l'humanité, l'apprentissage du repentir sincère et la miséricorde divine infinie.",
            "full_story": "Allah créa Adam à partir d'argile et lui insuffla la vie. Il lui enseigna le nom de toutes choses, démontrant ainsi la valeur du savoir. Après avoir commis l'erreur de goûter au fruit de l'arbre interdit suite aux insinuations d'Iblis, Adam et Hawa prirent conscience de leur faute et demandèrent immédiatement pardon avec humilité. Allah accepta leur repentir et les établit sur Terre comme guides.",
            "lessons": ["La valeur inestimable de la connaissance", "La puissance du repentir immédiat", "L'humilité face aux erreurs"]
        },
        {
            "id": "p2",
            "name": "Ibrahim (AS)",
            "title": "L'Ami Intime d'Allah (Khalilullah)",
            "summary": "Symbole absolu de la foi pure et du Tawakkul (confiance totale), Ibrahim a remis en question le polythéisme de son peuple dès son jeune âge.",
            "full_story": "Ibrahim observa les étoiles, la lune et le soleil pour démontrer logiquement à son peuple que seul le Créateur incréé mérite l'adoration. Jeté dans un brasier ardent par le roi Nimrod, Allah ordonna au feu d'être 'fraîcheur et paix' pour lui. Plus tard, soumis à la lourde épreuve de sacrifier son fils Ismail, son obéissance exemplaire mena à la miséricorde d'Allah et à l'édification de la Kaaba.",
            "lessons": ["La réflexion logique et la quête de vérité", "La confiance absolue dans les épreuves", "La soumission sincère à la volonté divine"]
        },
        {
            "id": "p3",
            "name": "Youssef (AS)",
            "title": "Le Noble, Fils du Noble",
            "summary": "Un récit fascinant sur la patience (Sabr), le pardon et le passage de l'épreuve à la grandeur.",
            "full_story": "Jalousé par ses frères et jeté au fond d'un puits, Youssef fut vendu comme esclave en Égypte. Confronté aux fausses accusations de l'épouse d'Al-Aziz, il préféra la prison à la transgression. Grâce au don d'interprétation des rêves accordé par Allah, il sauva l'Égypte de la famine et devint le ministre des finances. Lors des retrouvailles avec ses frères, il leur pardonna sans rancune.",
            "lessons": ["La patience magnifique (Sabr Jameel)", "La pureté morale face à la tentation", "La capacité de pardonner à ceux qui nous ont fait du tort"]
        },
        {
            "id": "p4",
            "name": "Moussa (AS)",
            "title": "Celui qui parla à Allah (Kalimullah)",
            "summary": "L'histoire du courage face à la tyrannie de Pharaon et du guidage du peuple d'Israël vers la liberté.",
            "full_story": "Élevé dans le palais même de Pharaon, Moussa dût fuir vers Madyan après un incident. C'est dans le désert, au mont Tour, qu'Allah lui parla et lui confia la mission de libérer le peuple opprimé. Armé des miracles de son bâton et soutenu par son frère Haroun, il affonta Pharaon. Cerné entre l'armée égyptienne et la mer, Moussa déclara avec foi : 'Mon Seigneur est avec moi, Il me guidera', et la mer se fendit.",
            "lessons": ["Le courage indomptable contre l'oppression", "La confiance absolue au bord de l'impossible", "Le soutien fraternel"]
        }
    ]

@app.get("/api/courses")
def get_courses():
    return [
        {
            "id": "c1",
            "category": "spirituel",
            "title": "Les Fondements du Tawakkul",
            "description": "Apprenez à combiner l'effort sincère et le lâcher-prise émotionnel.",
            "level": "Débutant • 3 leçons",
            "steps": [
                {
                    "id": "c1_s1",
                    "title": "1. Définir le Tawakkul",
                    "duration": "3 min",
                    "content": "Le Tawakkul ne signifie pas l'inactivité. C'est attacher son chameau d'abord (faire tous les efforts humains possibles), puis placer sa confiance entière en Allah pour le résultat final."
                },
                {
                    "id": "c1_s2",
                    "title": "2. Libérer l'anxiété du résultat",
                    "duration": "4 min",
                    "content": "Une fois vos actions accomplies, l'inquiétude devient inutile. Acceptez que le décret divin renferme toujours une sagesse supérieure, même lorsqu'il diffère de nos attentes."
                },
                {
                    "id": "c1_s3",
                    "title": "3. Pratique quotidienne de l'abandon",
                    "duration": "5 min",
                    "content": "Chaque soir, récapitulez vos efforts du jour et répétez mentalement : 'J'ai fait ma part, le reste appartient à Mon Créateur'."
                }
            ]
        },
        {
            "id": "c2",
            "category": "psycho",
            "title": "Régulation du Stress & Anxiété",
            "description": "Techniques neuroscientifiques et ancrage spirituel pour apaiser le mental.",
            "level": "Intermédiaire • 2 leçons",
            "steps": [
                {
                    "id": "c2_s1",
                    "title": "1. Le rôle du système nerveux",
                    "duration": "4 min",
                    "content": "L'anxiété active le mode 'combat ou fuite'. En ralentissant volontairement la respiration, vous envoyez un signal biologique immédiat de sécurité à votre cerveau."
                },
                {
                    "id": "c2_s2",
                    "title": "2. Recadrage des pensées intrusives",
                    "duration": "5 min",
                    "content": "Quand une pensée anxieuse survient, observez-la sans la juger. Remplacez 'Et si le pire arrivait ?' par 'Même si une épreuve survient, j'aurai les ressources pour la surmonter'."
                }
            ]
        }
    ]