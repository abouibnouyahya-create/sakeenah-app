from database import SessionLocal
import models

def seed_data():
    db = SessionLocal()
    
    # Vérifier si des cours existent déjà
    if db.query(models.Course).first():
        print("La base de données contient déjà des données.")
        db.close()
        return

    # Cours 1
    course1 = models.Course(
        id="c1",
        category="spirituel",
        title="Les Fondements de la Paix Intérieure",
        description="Apprenez à lâcher prise et à remettre vos inquiétudes au Créateur (Tawakkul).",
        level="Niveau 1"
    )
    
    step1_1 = models.Step(
        id="c1_s1",
        course_id="c1",
        title="1. Comprendre la confiance (Tawakkul)",
        duration="3 min",
        content="Le Tawakkul est la combinaison entre l'action sincère et l'abandon du résultat. Vous faites votre possible, puis vous libérez votre esprit."
    )
    
    step1_2 = models.Step(
        id="c1_s2",
        course_id="c1",
        title="2. Pratiquer la Présence dans l'Invocation",
        duration="4 min",
        content="Prenez 2 minutes chaque jour pour vous déconnecter du bruit environnant et formuler une intention claire."
    )

    # Cours 2
    course2 = models.Course(
        id="c2",
        category="psycho",
        title="Gestion de l'Anxiété & Émotions",
        description="Techniques cognitives et comportementales pour apaiser le mental.",
        level="Niveau 1"
    )
    
    step2_1 = models.Step(
        id="c2_s1",
        course_id="c2",
        title="1. Identifier les Réactions Automatiques",
        duration="5 min",
        content="L'anxiété naît souvent d'une projection sur le futur. Ramener votre attention sur le corps et la respiration coupe immédiatement ce cycle."
    )

    db.add_all([course1, step1_1, step1_2, course2, step2_1])
    db.commit()
    db.close()
    print("Base de données initialisée avec succès !")

if __name__ == "__main__":
    seed_data()