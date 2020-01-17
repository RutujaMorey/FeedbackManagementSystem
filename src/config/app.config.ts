export class AppConfig {

    static getConfig(): any {
        return {
            'api': {
                'getOutreachEvents': '/api/feedbackmanagement/outreach/events',
                'getOutreachEventDetails': '/api/feedbackmanagement/outreach/getevent',
                'getFeedbackStatistics': '/api/feedbackmanagement/outreach/feedback/statistics',
                'getEventFeedbackDetails': '/api/feedbackmanagement/outreach/getfeedbackdetails',
                'validateUserCredentials': '/api/feedbackmanagement/user/login',
                'createNewUser': '/api/feedbackmanagement/user/signup',
                'sendParticipatedFeedback': '/api/feedbackmanagement/feedback/participated',
                'sendUnregisteredFeedback': '/api/feedbackmanagement/feedback/unregistered',
                'sendNotParticipatedFeedback': '/api/feedbackmanagement/feedback/notparticipated',
                'getEmailBody': '/api/sendmail/mail/compose',
                'sendEmail': '/api/sendmail/mail/send',
                'addRole': '/api/feedbackmanagement/config/add',
                'deleteRole': '/api/feedbackmanagement/config/delete',
                'findEventFromEmail': '/api/feedbackmanagement/config/fetcheventfor',
                'findEmployeesByRoleAndEvent': '/api/feedbackmanagement/config/fetchemployeesfor',
                'createFeedbackForm': '/api/feedbackmanagement/forms/create',
                'deleteFeedbackForm': '/api/feedbackmanagement/forms/delete',
                'getFeedbackForm': '/api/feedbackmanagement/forms/getform',
                'getAllFormQuestions': '/api/feedbackmanagement/forms/getallform',
                'updateFeedbackForm': '/api/feedbackmanagement/forms/edit'
            }
        }
    }
}