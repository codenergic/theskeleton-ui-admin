export default {
  main: {
    navTitle: 'The<strong>Skeleton</strong>',
    title: 'TheSkeleton',
    route: {
      'index': 'Dasbor',
      'about': 'Tentang',
      'admin': 'Admin',
      'admin-roles': 'Peran',
      'admin-roles-id': 'Tambah / Perbarui Peran',
      'admin-roles-id-privileges': 'Tugaskan hak khusus kepada peran',
      'admin-users': 'Pengguna',
      'admin-users-id': 'Tambah / Perbarui Pengguna',
      'admin-users-id-roles': 'Tugaskan peran kepada pengguna',
      'app-logout': 'Keluar',
      'profile': 'Profil',
      'profile-apps': 'Apps Terhubung',
      'profile-basic': 'Perbarui profil dasar anda',
      'profile-oauth-apps': 'OAuth Apps',
      'profile-oauth-apps-id': 'OAuth Apps',
      'profile-password': 'Perbarui kata sandi anda',
      'profile-picture': 'Perbarui foto profil anda',
      'profile-sessions': 'Sesi',
      'profile-socials': 'Sosial'
    }
  },
  common: {
    account: 'Akun',
    action: 'Aksi',
    add: 'Tambah',
    addNew: 'Tambah {0} baru',
    addOrModify: 'Tambah atau modifikasi {0}',
    connected: 'Terhubung',
    delete: 'Hapus {0}',
    deleteConfirm: 'Konfirmasi Penghapusan',
    deleteConfirmation: 'Apakah anda yakin ingin menghapus {0}?',
    deleteSuccess: '{0} telah dihapus',
    disconnect: 'Putuskan',
    lock: 'Kunci {0} ({1})',
    modify: 'Modifikasi {0} ({1})',
    redirecting: 'Mengarahkan...',
    revoke: 'Cabut',
    terminate: 'Akhiri',
    save: 'Simpan',
    unlock: 'Buka {0} ({1})',
    update: 'Perbarui {0}',
    updateSuccess: '{0} telah diperbarui',
    view: 'Lihat {0}'
  },
  admin: {
    base: {
      title: 'Admin'
    },
    role: {
      title: 'Peran',
      subtitleAssignPrivilege: 'Tugaskan hak khusus kepada peran',
      label: 'peran',
      labelCode: 'Kode',
      labelDescription: 'Deskripsi',
      labelPrivileges: 'Hak Khusus'
    },
    user: {
      title: 'Pengguna',
      subtitleAssignRole: 'Tugaskan peran kepada pengguna',
      label: 'pengguna',
      labelEmail: 'Surel',
      labelRoles: 'Peran',
      labelUnlocked: 'Terbuka',
      labelUsername: 'Nama Pengguna'
    }
  },
  profile: {
    apps: {
      title: 'Apps Tersambung'
    },
    basic: {
      title: 'Dasar',
      subtitle: 'Perbarui profil dasar anda',
      labelEmail: 'Surel',
      labelUsername: 'Nama Pengguna',
      messageChangeUsername: 'Jika anda mengubah nama pengguna, anda perlu masuk kembali'
    },
    oauthApps: {
      title: 'OAuth Apps',
      subtitle: 'Apps Saya',
      label: 'apps',
      labelAppDescription: 'Deskripsi App',
      labelAppId: 'App ID',
      labelAppName: 'Nama App',
      labelAppSecret: 'Sandi Rahasia App',
      labelAuthorizedGrantTypes: 'Authorized Grant Types',
      labelCreateNewApp: 'Buat OAuth App Baru',
      labelRedirectUris: 'Alamat (URI) Pengalihan'
    },
    password: {
      title: 'Kata Sandi',
      subtitle: 'Perbarui kata sandi anda',
      labelPasswordConfirm: 'Konfirmasi kata sandi',
      labelPasswordNew: 'Kata sandi baru',
      labelPasswordOld: 'Kata sandi lama',
      messagePasswordUpdated: 'Kata sandi telah diperbarui'
    },
    picture: {
      title: 'Foto',
      subtitle: 'Unggah foto profil anda',
      labelUpload: 'Unggah foto profil'
    },
    session: {
      title: 'Sesi'
    },
    social: {
      title: 'Sosial'
    }
  }
}
