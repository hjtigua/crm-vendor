import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      exampleField: 6,
    },
    {
      exampleField: 4,
    },
    {
      exampleField: 2,
    },
    {
      exampleField: 1,
    },
  ];

  create(createCourseInput: CreateCourseInput) {
    return 'This action adds a new course';
  }

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses[id];
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
