﻿﻿using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace OfficeMap
{
    public class AuthOptions
    {
        public const string Issuer = "MyAuthServer"; // издатель токена
        public const string Audience = "MyAuthClient"; // потребитель токена
        private const string Key = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int Lifetime = 180; // время жизни токена - 60 минут
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
