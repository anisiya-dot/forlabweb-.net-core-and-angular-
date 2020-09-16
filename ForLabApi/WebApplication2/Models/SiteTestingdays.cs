﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ForLabApi.Models
{
    public class SiteTestingdays
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public int testingareaid { get; set; }
        public int siteid { get; set; }
        public int testingdays { get; set; }
        public int? UserId { get; set; }

    }

    public class SiteTestingdaysList
    {

        public int Id { get; set; }
        public int testingareaid { get; set; }
        public string testingareaName { get; set; }
        public int siteid { get; set; }
        public int testingdays { get; set; }
    }

}
