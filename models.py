from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(String, primary_key=True, index=True)
    category = Column(String, nullable=False) # spirituel | psycho | developpement
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    level = Column(String, nullable=False)

    steps = relationship("Step", back_populates="course", cascade="all, delete-orphan")

class Step(Base):
    __tablename__ = "steps"

    id = Column(String, primary_key=True, index=True)
    course_id = Column(String, ForeignKey("courses.id"))
    title = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    content = Column(Text, nullable=False)

    course = relationship("Course", back_populates="steps")