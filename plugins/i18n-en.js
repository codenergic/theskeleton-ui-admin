export default {
  main: {
    navTitle: 'The<strong>Skeleton</strong>',
    title: 'TheSkeleton',
    route: {
      'index': 'Dashboard',
      'admin': 'Admin',
      'admin-users': 'Users',
      'admin-users-id': 'Create / Update User',
      'admin-users-id-roles': 'Assign roles to user'
    }
  },
  common: {
    action: 'Action',
    add: 'Add',
    addNew: 'Add new {0}',
    addOrModify: 'Add or modify {0}',
    delete: 'Delete {0}',
    deleteConfirm: 'Confirm Delete',
    deleteConfirmation: 'Are you sure you want to delete {0}?',
    deleteSuccess: '{0} deleted',
    lock: 'Lock {0} ({1})',
    modify: 'Modify {0} ({1})',
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
    }
  }
}
