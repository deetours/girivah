'use client'

export type BookingPayload = {
  expeditionId: string;
  items?: { slug: string; kind: string }[];
  name: string;
  email: string;
  phone: string;
  age: string;
  medicalConditions: string;
  ridingExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export type BookingResult = {
  referenceId: string;
}

/**
 * Submits a booking application.
 * Currently uses localStorage for mock persistence.
 * Ready to be swapped with a real backend call.
 */
export async function submitBookingApplication(data: BookingPayload): Promise<BookingResult> {
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      const referenceId = `GVH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      
      const application = {
        ...data,
        referenceId,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      }
      
      // Keep using localStorage for now as requested by the audit fix plan
      if (typeof window !== 'undefined') {
        const existing = JSON.parse(localStorage.getItem('girivah_applications') || '[]')
        existing.push(application)
        localStorage.setItem('girivah_applications', JSON.stringify(existing))
      }
      
      resolve({ referenceId })
    }, 1500)
  })
}
