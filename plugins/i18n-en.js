export default {
  main: {
    navTitle: 'The<strong>Skeleton</strong>',
    title: 'TheSkeleton',
    route: {
      'index': 'Dashboard',
      'about': 'About',
      'admin': 'Admin',
      'admin-roles': 'Roles',
      'admin-roles-id': 'Create / Update Role',
      'admin-roles-id-privileges': 'Assign privileges to role',
      'admin-users': 'Users',
      'admin-users-id': 'Create / Update User',
      'admin-users-id-roles': 'Assign roles to user',
      'app-logout': 'Logout',
      'profile': 'Profile',
      'profile-apps': 'Connected Apps',
      'profile-basic': 'Update your basic profile',
      'profile-password': 'Update your password',
      'profile-picture': 'Update your profile picture',
      'profile-sessions': 'Session',
      'profile-socials': 'Socials'
    }
  },
  common: {
    account: 'Account',
    action: 'Action',
    add: 'Add',
    addNew: 'Add new {0}',
    addOrModify: 'Add or modify {0}',
    connected: 'Connected',
    delete: 'Delete {0}',
    deleteConfirm: 'Confirm Delete',
    deleteConfirmation: 'Are you sure you want to delete {0}?',
    deleteSuccess: '{0} deleted',
    disconnect: 'Disconnect',
    lock: 'Lock {0} ({1})',
    modify: 'Modify {0} ({1})',
    redirecting: 'Redirecting...',
    revoke: 'Revoke',
    terminate: 'Terminate',
    save: 'Save',
    unlock: 'Unlock {0} ({1})',
    update: 'Update {0}',
    updateSuccess: '{0} updated',
    view: 'View {0}'
  },
  admin: {
    base: {
      title: 'Admin'
    },
    role: {
      title: 'Roles',
      subtitleAssignPrivilege: 'Assign privilege to role',
      label: 'role',
      labelCode: 'Code',
      labelDescription: 'Description',
      labelPrivileges: 'Privileges'
    },
    user: {
      title: 'Users',
      subtitleAssignRole: 'Assign role to user',
      label: 'user',
      labelEmail: 'Email',
      labelRoles: 'Roles',
      labelUnlocked: 'Unlocked',
      labelUsername: 'Username'
    }
  },
  profile: {
    apps: {
      title: 'Apps'
    },
    basic: {
      title: 'Basic',
      subtitle: 'Update your basic profile',
      labelEmail: 'Email',
      labelUsername: 'Username',
      messageChangeUsername: 'If you change your username, you will need to sign in again'
    },
    password: {
      title: 'Password',
      subtitle: 'Update your password',
      labelPasswordConfirm: 'Confirm new password',
      labelPasswordNew: 'New password',
      labelPasswordOld: 'Old password',
      messagePasswordUpdated: 'Password updated'
    },
    picture: {
      title: 'Picture',
      subtitle: 'Upload your profile picture',
      labelUpload: 'Upload profile picture'
    },
    session: {
      title: 'Sessions'
    },
    social: {
      title: 'Socials'
    }
  }
}
