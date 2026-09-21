import { BadRequestException } from "@nestjs/common";
import * as crypto from "crypto";

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseDefinition {
  id: string;
  title: string;
  titleBn: string;
  cmeCredits: number;
  passingScorePercent: number;
  modules: CourseModule[];
}

export interface MemberCourseProgress {
  memberId: string;
  courseId: string;
  completedLessonIds: Set<string>;
  quizScorePercent?: number | undefined;
  completedAt?: Date | undefined;
}

export interface CourseCertificate {
  certificateId: string;
  courseId: string;
  memberId: string;
  cmeCredits: number;
  issuedAt: Date;
  securityHash: string;
  verificationUrl: string;
}

export class LmsEngine {
  /**
   * Calculates course completion progress percentage
   */
  static calculateProgress(
    course: CourseDefinition,
    completedLessonIds: Set<string>
  ): { totalLessons: number; completedLessons: number; progressPercent: number } {
    let total = 0;
    for (const mod of course.modules) {
      total += mod.lessons.length;
    }

    if (total === 0) {
      return { totalLessons: 0, completedLessons: 0, progressPercent: 100 };
    }

    const completed = completedLessonIds.size;
    const progressPercent = Math.min(100, Math.round((completed / total) * 100));

    return {
      totalLessons: total,
      completedLessons: completed,
      progressPercent,
    };
  }

  /**
   * Evaluates quiz score and issues verifiable course accreditation certificate
   */
  static issueAccreditationCertificate(
    course: CourseDefinition,
    progress: MemberCourseProgress
  ): CourseCertificate {
    const { progressPercent } = this.calculateProgress(course, progress.completedLessonIds);

    if (progressPercent < 100) {
      throw new BadRequestException("All course lessons must be completed before certificate issuance");
    }

    const score = progress.quizScorePercent ?? 0;
    if (score < course.passingScorePercent) {
      throw new BadRequestException(
        `Quiz score ${score}% is below required passing mark of ${course.passingScorePercent}%`
      );
    }

    const certSerial = `CERT-LMS-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const hashPayload = `${certSerial}|${course.id}|${progress.memberId}|${course.cmeCredits}`;
    const securityHash = crypto.createHash("sha256").update(hashPayload).digest("hex");

    return {
      certificateId: certSerial,
      courseId: course.id,
      memberId: progress.memberId,
      cmeCredits: course.cmeCredits,
      issuedAt: new Date(),
      securityHash,
      verificationUrl: `https://app.orgos.bd/verify/cert/${certSerial}?hash=${securityHash.substring(0, 16)}`,
    };
  }
}
